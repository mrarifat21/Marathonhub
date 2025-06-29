import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import SocialLogin from "../components/SocialLogin";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      navigate(location.state || "/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("Email or password is incorrect.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-11/12 mx-auto bg-surfaceColor border border-border p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-highlight">
            Login
          </h2>

          <form onSubmit={handleLogIn} className="space-y-4">
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
                className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                required
              />
            </div>

            {/* Password */}
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
                className="input input-bordered w-full rounded-md bg-surfaceColor text-text border-1 border-border"
                required
              />
              {errorMessage && (
                <p className="text-sm text-red-500 mt-2 italic">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgotPassword">
                <button
                  type="button"
                  className="text-sm text-button hover:text-highlight hover:underline"
                >
                  Forgot Password?
                </button>
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 cursor-pointer ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-button hover:bg-button-hover text-surfaceColor"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider text-muted-text">OR</div>

          {/* Social Login */}
          <SocialLogin />

          {/* Register */}
          <p className="text-sm text-center mt-6 text-text">
            Don’t have an account?{" "}
            <Link
              to="/registration"
              className="font-medium text-button hover:text-highlight hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
