import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import ThemeChanger from "./ThemeChanger";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const NavBar = () => {
  const { logOut, user } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const activeClass = "text-button font-semibold underline";
  const inactiveClass = "text-text hover:text-button transition";

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/marathons"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Marathons
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              to="/dashboard/addMarathon"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogOut}
              className="text-warning hover:underline font-semibold transition"
              aria-label="Logout"
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/registration"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav
      className="navbar  w-11/12 px-4 py-3  flex justify-between items-center border-b-2  mx-auto z-1000"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-start flex items-center space-x-4">
 
        <div className="dropdown lg:hidden">
          <label
            tabIndex={0}
            htmlFor="menu-toggle"
            className="btn btn-ghost p-2"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-text"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <input type="checkbox" id="menu-toggle" className="hidden" />
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-surfaceColor rounded-md shadow-lg mt-12 p-3 w-48 z-50"
            role="menu"
            aria-label="Mobile menu"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="text-2xl font-bold text-text select-none">
          Marathon<span className="text-button">Hub</span>
        </Link>
      </div>

   
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{navLinks}</ul>
      </div>

     
      <div className="flex items-center gap-3">
        {user &&   <img
              src={user.photoURL || "n/a"}
              // alt={user.email || "N/A"}
              title={user.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover border-2 border-button"
            />}
      
        <ThemeChanger />
      </div>
    </nav>
  );
};

export default NavBar;
