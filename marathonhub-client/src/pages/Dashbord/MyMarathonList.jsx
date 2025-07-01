import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toISOString().slice(0, 10);
};

const MyMarathonList = () => {
  const { user } = use(AuthContext);
  const [myMarathons, setMyMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/addMarathon/${user.email}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => setMyMarathons(res.data))
        .catch((err) => console.error("Error fetching:", err));
    }
  }, [user]);

  const handleUpdateClick = (marathon) => {
    setSelectedMarathon(marathon);
    document.getElementById("update_modal").showModal();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/marathon/${selectedMarathon._id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setMyMarathons((prev) =>
            prev.map((m) =>
              m._id === selectedMarathon._id ? { ...m, ...updatedData } : m
            )
          );
          Swal.fire("Updated!", "Your marathon was updated.", "success");
        }
        document.getElementById("update_modal").close();
        setSelectedMarathon(null);
      })
      .catch((err) => {
        // console.error("Update error:", err);
        Swal.fire("Error!", "Failed to update marathon.", "error");
      });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the marathon.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/marathon/${id}`
        );
        if (res.data.deletedCount > 0) {
          setMyMarathons(myMarathons.filter((m) => m._id !== id));
          Swal.fire("Deleted!", "Your marathon has been removed.", "success");
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Added-Marathon</title>
      </Helmet>
      <div className="p-6 bg-surfaceColor text-text min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-highlight">
          My Added Marathons
        </h2>
        {myMarathons.length === 0 ? (
          <p className="text-lg">No marathons added yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table w-full bg-surface text-text border-border border-1">
              <thead className="bg-muted-text text-text">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Distance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {myMarathons.map((marathon, index) => (
                  <tr key={marathon._id} className="border-border border-1">
                    <td>{index + 1}</td>
                    <td>{marathon.title}</td>
                    <td>{marathon.location}</td>
                    <td>{marathon.runningDistance}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => handleUpdateClick(marathon)}
                        className="btn btn-sm border-none bg-button  hover:bg-button-hover text-text"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(marathon._id)}
                        className="btn btn-sm border-none bg-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* UPDATE MODAL */}
        <dialog id="update_modal" className="modal">
          <div className="modal-box overflow-auto bg-surfaceColor text-text max-w-lg">
            <h3 className="font-bold text-xl mb-4 text-highlight">
              Update Marathon
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="flex gap-5 flex-col md:flex-row">
                {/* title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 font-semibold text-text"
                  >
                    Marathon Title
                  </label>
                  <input
                    name="title"
                    defaultValue={selectedMarathon?.title}
                    className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                    placeholder="Title"
                    required
                  />
                </div>
                {/* location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 font-semibold text-text"
                  >
                    Location
                  </label>
                  <input
                    name="location"
                    defaultValue={selectedMarathon?.location}
                    className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                    placeholder="Location"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-5 flex-col md:flex-row">
                {/* startRegistrationDate */}
                <div>
                  <label
                    htmlFor="startRegistrationDate"
                    className="block mb-2 font-semibold text-text"
                  >
                    Start Registration Date
                  </label>
                  <input
                    type="date"
                    name="startRegistrationDate"
                    defaultValue={formatDateForInput(
                      selectedMarathon?.startRegistrationDate
                    )}
                    className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                    required
                  />
                </div>
                {/* endRegistrationDate */}
                <div>
                  <label
                    htmlFor="endRegistrationDate"
                    className="block mb-2 font-semibold text-text"
                  >
                    End Registration Date
                  </label>
                  <input
                    type="date"
                    name="endRegistrationDate"
                    defaultValue={formatDateForInput(
                      selectedMarathon?.endRegistrationDate
                    )}
                    className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-5 flex-col md:flex-row">
                {/* marathonStartDate */}
                <div>
                  <label
                    htmlFor="marathonStartDate"
                    className="block mb-2 font-semibold text-text"
                  >
                    Marathon Start Date
                  </label>
                  <input
                    type="date"
                    name="marathonStartDate"
                    defaultValue={formatDateForInput(
                      selectedMarathon?.marathonStartDate
                    )}
                    className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                    required
                  />
                </div>

                {/*  runningDistance*/}
                <div>
                  <label
                    htmlFor="runningDistance"
                    className="block mb-2 font-semibold text-text"
                  >
                    Running Distance
                  </label>
                  <select
                    name="runningDistance"
                    defaultValue={selectedMarathon?.runningDistance}
                    className="select select-bordered  w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                    required
                  >
                    <option value="">Select Distance</option>
                    <option value="25k">25k</option>
                    <option value="10k">10k</option>
                    <option value="3k">3k</option>
                  </select>
                </div>
              </div>
              {/*  description*/}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 font-semibold text-text"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedMarathon?.description}
                  className="textarea  w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                  placeholder="Description"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="imageURL"
                  className="block mb-2 font-semibold text-text"
                >
                  Marathon Image URL
                </label>
                <input
                  type="url"
                  name="imageURL"
                  defaultValue={selectedMarathon?.imageURL}
                  className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                  placeholder="Image URL"
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn border-none bg-[#2a9d8f] text-white hover:bg-[#21867a]"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("update_modal").close();
                    setSelectedMarathon(null);
                  }}
                  className="btn border-none"
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

export default MyMarathonList;
