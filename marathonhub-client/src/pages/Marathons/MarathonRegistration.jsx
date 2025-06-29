import React, { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const MarathonRegistration = () => {
  const location = useLocation();
  const { user } = use(AuthContext);
  const { marathon } = location.state || {};
  const [registrationCount, setRegistrationCount] = useState(
    marathon.registrationCount
  );
  //   console.log(marathon);

  const handleRegisterMerathon = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const allInfo = Object.fromEntries(formData.entries());

    const registerMerathonInfo = {
      email: user.email,
      marathonId: marathon._id,
      marathonTitle: marathon.title,
      ...allInfo,
    };
    // console.log(registerMerathonInfo.firstName);


    axios
      .post(
        `${import.meta.env.VITE_API_URL}/registerMerathon`,
        registerMerathonInfo
      )
      .then((res) => {
        const data = res.data;
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();

          //   update registerCount
          axios
            .patch(
              `${import.meta.env.VITE_API_URL}/marathons/${marathon._id}/increaseRegistrationCount`
            )
            .then((countRes) => {
              if (countRes.data.modifiedCount > 0) {
                setRegistrationCount((prev) => prev + 1);
             
              }
            })
            .catch((err) => {
             
              Swal.fire({
                icon: "error",
                title: "Error updating count",
                text: "Could not update registration count.",
                showConfirmButton: true,
              });
            });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-11/12 mx-auto bg-surfaceColor border border-border p-8 rounded-xl shadow-lg">
        <form
          onSubmit={handleRegisterMerathon}
          className="max-w-xl mx-auto p-6  shadow-md rounded-lg"
        >
          <h2 className="text-3xl font-extrabold mb-8 text-center text-highlight">
            Marathon Registration
          </h2>

          {/* Email (readonly, auto-filled for logged-in user) */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-text">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
            />
          </div>

          {/* Marathon Title (readonly) */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-text">
              Marathon Title
            </label>
            <input
              type="text"
              value={marathon.title} // Replace with dynamic marathon title
              readOnly
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
            />
          </div>

          {/* Start Date (readonly) */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-text">
              Start Date
            </label>
            <input
              type="text"
              value={marathon.marathonStartDate}
              readOnly
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-text">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-text">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-text">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Enter your contact number"
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
              required
            />
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-text">
              Additional Info
            </label>
            <textarea
              name="additionalInfo"
              placeholder="Any additional info..."
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border textarea"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarathonRegistration;
