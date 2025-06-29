import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet";

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [appliedMarathons, setAppliedMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReg, setSelectedReg] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user-registrations/${user.email}`)
        .then((res) => {
          setAppliedMarathons(res.data);
          setLoading(false);
        })
        .catch((err) => {
          // console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleUpdateClick = (reg) => {
    setSelectedReg(reg);
    setFormData({
      firstName: reg.firstName || "",
      lastName: reg.lastName || "",
      contactNumber: reg.contactNumber || "",
      additionalInfo: reg.additionalInfo || "",
    });
    document.getElementById("update_modal").showModal();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/registredMarathon/${selectedReg._id}`,
        formData
      );

      if (res.data.modifiedCount > 0) {
        setAppliedMarathons((arr) =>
          arr.map((m) =>
            m._id === selectedReg._id ? { ...m, ...formData } : m
          )
        );
        Swal.fire("Updated!", "Registration updated.", "success");
      } else {
        Swal.fire("No Changes", "No changes were made to the registration.", "info");
      }
    } catch (error) {
      // console.error("Update error:", error);
      Swal.fire("Error!", "Failed to update registration.", "error");
    } finally {
      document.getElementById("update_modal").close();
      setSelectedReg(null);
      setFormData({
        firstName: "",
        lastName: "",
        contactNumber: "",
        additionalInfo: "",
      });
    }
  };

  const handleDelete = async (id, marathonId) => {
    const confirm = await Swal.fire({
      title: "Remove registration?",
      text: "You will be un-registered from this marathon.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, keep it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/registredMarathon/${id}`
        );

        if (res.data.deletedCount > 0) {
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/marathons/decrement/${marathonId}`
          );

          setAppliedMarathons((arr) => arr.filter((m) => m._id !== id));
          Swal.fire("Deleted", "Registration removed.", "success");
        } else {
          Swal.fire("Error", "Could not delete registration.", "error");
        }
      } catch (error) {
        // console.error("Delete error:", error);
        Swal.fire("Error", "Failed to remove registration.", "error");
      }
    }
  };

  const filteredMarathons = appliedMarathons.filter((marathon) =>
    marathon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <>
     <Helmet>
      <title>Applied-Marathon</title>
    </Helmet>
    <div className="p-6 overflow-x-auto bg-surfaceColor text-text min-h-screen rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-highlight">
        My Applied Marathons
      </h2>

      {/* Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full bg-surfaceColor text-text border border-border rounded-md"
        />
      </div>

      {filteredMarathons.length === 0 ? (
        <p className="text-center">No applied marathons found.</p>
      ) : (
        <table className="table w-full border border-border">
          <thead className="bg-muted-text text-text uppercase">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarathons.map((marathon, i) => (
              <tr key={marathon._id} className="border-border">
                <td>{i + 1}</td>
                <td>{marathon.title}</td>
                <td>{marathon.location || "N/A"}</td>
                <td>
                  {new Date(marathon.marathonStartDate).toLocaleDateString() ||
                    "N/A"}
                </td>
                <td className="space-x-2 text-center">
                  <button
                    onClick={() => handleUpdateClick(marathon)}
                    className="btn btn-sm btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(marathon._id, marathon.marathonId)
                    }
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box bg-surfaceColor text-text max-w-md">
          <h3 className="text-xl font-bold mb-4 text-highlight">
            Update Registration
          </h3>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-text">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-text">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                className="input w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                required
              />
            </div>

            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleFormChange}
              placeholder="Contact Number"
              className="input w-full rounded-md bg-surfaceColor text-text border-1 border-border"
              required
            />

            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleFormChange}
              placeholder="Additional Info"
              className="textarea w-full rounded-md bg-surfaceColor text-text border-1 border-border"
            />

            <div className="modal-action">
              <button type="submit" className="btn bg-[#2a9d8f] text-white">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  document.getElementById("update_modal").close();
                  setSelectedReg(null);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    contactNumber: "",
                    additionalInfo: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
    </>
  );
};

export default MyApplyList;
