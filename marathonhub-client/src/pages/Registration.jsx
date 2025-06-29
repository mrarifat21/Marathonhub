import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../components/SocialLogin";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from 'axios';
import { Helmet } from "react-helmet";

const Registration = () => {
  const { registerUser, setUser, updateUser } = use(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

    const validatePassword = (value) => {
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (value.length < 6) {
      return "Password must be at least six characters long.";
    }
    return "";
  };
    const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setErrorMessage(error);
  };

  const handleRegistrarion = (e) => {

    
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );
    // console.log(restFormData);
    const name = form.name.value;
    const photoURL = form.photoURL.value;
         const error = validatePassword(password);
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage("");

    registerUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL })
          // console.log(result)
          .then(() => {
            setUser({ ...user, displayName: name, photoURL });
          })
          .catch(() => {
            setUser(user);
          });

        const userProfile = {
          email,
          ...restFormData,
          creationTime: user?.metadata.creationTime,
          lastSignInTime: user?.metadata.lastSignInTime,
          uid: user.uid,
          provider: "email",
        };
        axios.post(`${import.meta.env.VITE_API_URL}/users`,userProfile)
          .then((res) => {
            const data= res.data
            if (data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Your account has been created",
                showConfirmButton: false,
                timer: 1500,
              });
            navigate(location.state || "/");
            }
            // console.log("adding data to db", data);
          });
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
    <>
     <Helmet>
      <title>Registration</title>
    </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-11/12 mx-auto bg-surfaceColor border border-border p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-highlight">
          Register
        </h2>

        <form onSubmit={handleRegistrarion} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-text"
            >
              Name
            </label>
            <input
              id="name"
              type="name"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-text"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="block mb-2 font-semibold text-text"
            >
              Photo URL
            </label>
            <input
              id="photoURL"
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
              
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-text"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              onChange={handlePasswordChange}
              className="input input-bordered w-full rounded-md bg-surfaceColor text-text  border-1 border-border"
              required
            />
            {errorMessage && (
            <p className="text-red-500 text-sm italic my-1">{errorMessage}</p>
          )}
          </div>

          <button
            type="submit"
            className="w-full bg-button hover:bg-button-hover text-surface font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="divider text-muted-text">OR</div>

        {/* Social Login */}
        <SocialLogin></SocialLogin>

        <p className="text-sm text-center mt-6 text-text">
          Already have an account?{" "}
          <Link to="/login" className=" font-medium text-button hover:text-highlight hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Registration;
