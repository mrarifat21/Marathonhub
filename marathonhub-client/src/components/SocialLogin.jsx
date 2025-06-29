import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { createUserWithGmail } = use(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    createUserWithGmail()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const userProfile = {
          email: user.email,
          creationTime: user?.metadata.creationTime,
          lastSignInTime: user?.metadata.lastSignInTime,
          uid: user?.uid,
          provider: "gmail",
        };
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
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
      .catch((error) => {
        // console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Something went wrong during Google login.",
          confirmButtonColor: "#d33",
        });
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] py-2 rounded-lg shadow-sm hover:bg-[var(--color-surfaceColor)] transition cursor-pointer"
      >
        <FcGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
