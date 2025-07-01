import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet";
import { getAuth } from "firebase/auth";

const AddMarathon = () => {
  const { user } = useContext(AuthContext);
  const [startRegistrationDate, setStartRegistrationDate] = useState(null);
  const [endRegistrationDate, setEndRegistrationDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const addData = Object.fromEntries(formData.entries());
    const marathonData = {
      ...addData,
      createdAt: new Date(),
      registrationCount: 0,
      userEmail: user?.email,
      userName: user?.displayName,
    };
    // console.log(marathonData);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/addMarathon`, marathonData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Your Marathon has been added",
                showConfirmButton: false,
                timer: 1500,
              });
              form.reset();
              setStartRegistrationDate(null);
              setEndRegistrationDate(null);
              setMarathonStartDate(null);
            }
          })
          .catch((error) => {
            // console.error("Error adding marathon:", error);
            Swal.fire({
              icon: "error",
              title: "Failed to add marathon",
              text: "Something went wrong. Please try again later.",
            });
          });
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Marathon</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className=" mx-auto bg-surfaceColor border border-border p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-highlight">
            Add Marathon
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-5 flex-col md:flex-row">
              {/* Marathon Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 font-semibold text-text"
                >
                  Marathon Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter Marathon Title"
                  className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                  required
                />
              </div>
              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 font-semibold text-text"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  className="input w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                  required
                />
              </div>
            </div>

            <div className="flex gap-5 flex-col md:flex-row">
              {/* Start Registration Date */}
              <div>
                <label
                  htmlFor="startRegistrationDate"
                  className="block mb-2 font-semibold text-text"
                >
                  Start Registration Date
                </label>
                <DatePicker
                  id="startRegistrationDate"
                  name="startRegistrationDate"
                  selected={startRegistrationDate}
                  onChange={(date) => setStartRegistrationDate(date)}
                  className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                  placeholderText="Select start registration date"
                  required
                />
              </div>

              {/* End Registration Date */}
              <div>
                <label
                  htmlFor="endRegistrationDate"
                  className="block mb-2 font-semibold text-text"
                >
                  End Registration Date
                </label>
                <DatePicker
                  id="endRegistrationDate"
                  name="endRegistrationDate"
                  selected={endRegistrationDate}
                  onChange={(date) => setEndRegistrationDate(date)}
                  className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                  placeholderText="Select end registration date"
                  required
                />
              </div>
            </div>

            <div className="flex gap-5 flex-col md:flex-row">
              {/* Marathon Start Date */}
              <div>
                <label
                  htmlFor="marathonStartDate"
                  className="block mb-2 font-semibold text-text"
                >
                  Marathon Start Date
                </label>
                <DatePicker
                  id="marathonStartDate"
                  name="marathonStartDate"
                  selected={marathonStartDate}
                  onChange={(date) => setMarathonStartDate(date)}
                  className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
                  placeholderText="Select marathon start date"
                  required
                />
              </div>

              {/* Running Distance */}
              <div>
                <label
                  htmlFor="runningDistance"
                  className="block mb-2 font-semibold text-text"
                >
                  Running Distance
                </label>
                <select
                  id="runningDistance"
                  name="runningDistance"
                  className="select w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                  required
                >
                  <option value="">Select distance</option>
                  <option value="25k">25k</option>
                  <option value="10k">10k</option>
                  <option value="3k">3k</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-semibold text-text"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter marathon description"
                className="textarea w-full rounded-md bg-surfaceColor text-text border-1 border-border h-24 resize-none"
                required
              />
            </div>

            {/* Marathon Image URL */}
            <div>
              <label
                htmlFor="imageURL"
                className="block mb-2 font-semibold text-text"
              >
                Marathon Image URL
              </label>
              <input
                id="imageURL"
                type="url"
                name="imageURL"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-button hover:bg-button-hover text-surface font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 cursor-pointer"
            >
              Add Marathon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMarathon;
