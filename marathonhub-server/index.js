const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const decoded = Buffer.from(
  process.env.FIREBASE_SERVICE_KEY,
  "base64"
).toString("utf8");
const serviceAccount = JSON.parse(decoded);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use(
  cors({
    origin: ["https://marathonhub-fa092.web.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Client
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware to verify Firebase JWT token
const verifyFireBaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  // console.log(authHeader);
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "unauthorized access" });
  }
};

app.post("/jwt", async (req, res) => {
  const { email } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.email !== email) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      })
      .send({ success: true });
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
});

// Main App Function
async function run() {
  try {
    const db = client.db("marathonHub");
    const userCollection = db.collection("users");
    const marathonCollection = db.collection("marathons");
    const registerMarathonCollection = db.collection("registerMarathons");

    // --- User Routes ---
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const userProfile = req.body;
      const result = await userCollection.insertOne(userProfile);
      res.send(result);
    });

    // --- Marathon Routes ---
    app.get("/marathons", async (req, res) => {
      const limit = parseInt(req.query.limit) || 0;
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

      const cursor = marathonCollection.find().sort({ createdAt: sortOrder });
      if (limit > 0) cursor.limit(limit);

      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/marathons/:id", async (req, res) => {
      const id = req.params.id;
      const result = await marathonCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.post("/addMarathon", async (req, res) => {
      const marathonData = req.body;
      const result = await marathonCollection.insertOne(marathonData);
      res.send(result);
    });

    app.get("/addMarathon/:email", verifyFireBaseToken, async (req, res) => {
      const userEmail = req.params.email;
      // console.log(req.decoded);
      if (req.decoded.email !== userEmail) {
        return res.status(403).send({ message: "Forbidden" });
      }

      const query = { userEmail: userEmail };
      const result = await marathonCollection.find(query).toArray();
      res.send(result);
    });

    app.put("/marathon/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;

      const result = await marathonCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.send(result);
    });

    app.delete("/marathon/:id", async (req, res) => {
      const id = req.params.id;
      const result = await marathonCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.patch("/marathons/:id/increaseRegistrationCount", async (req, res) => {
      const id = req.params.id;
      const result = await marathonCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { registrationCount: 1 } }
      );
      res.send(result);
    });

    app.patch("/marathons/decrement/:id", async (req, res) => {
      const id = req.params.id;
      const result = await marathonCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { registrationCount: -1 } }
      );
      res.send(result);
    });

    // --- Registration Routes ---
    app.post("/registerMerathon", async (req, res) => {
      const data = req.body;
      const result = await registerMarathonCollection.insertOne(data);
      res.send(result);
    });

    app.get("/user-registrations/:email", async (req, res) => {
      const email = req.params.email;
      const registrations = await registerMarathonCollection
        .find({ email })
        .toArray();

      if (registrations.length === 0) return res.send([]);

      const marathonIds = registrations.map(
        (reg) => new ObjectId(reg.marathonId)
      );
      const marathons = await marathonCollection
        .find({ _id: { $in: marathonIds } })
        .toArray();

      const result = registrations.map((reg) => {
        const marathon = marathons.find(
          (m) => m._id.toString() === reg.marathonId
        );
        return {
          _id: reg._id,
          email: reg.email,
          contactNumber: reg.contactNumber || "",
          additionalInfo: reg.additionalInfo || "",
          firstName: reg.firstName || "",
          lastName: reg.lastName || "",
          marathonId: reg.marathonId,
          title: marathon?.title || "Unknown",
          location: marathon?.location || "N/A",
          marathonStartDate: marathon?.marathonStartDate || "",
        };
      });

      res.send(result);
    });

    app.put("/registredMarathon/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const result = await registerMarathonCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      res.send(result);
    });

    app.delete("/registredMarathon/:id", async (req, res) => {
      const id = req.params.id;
      const result = await registerMarathonCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("Error:", err);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to MarathonHub API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
