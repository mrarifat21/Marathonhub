import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-surfaceColor text-text border-t border-border px-6 py-12 transition-colors duration-300">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-extrabold text-text mb-4">MarathonHub</h2>
          <p className="text-muted-text leading-relaxed">
            MarathonHub is your trusted platform for discovering, registering, and managing marathon events. Whether you're a runner or organizer, we provide the tools and support you need for a smooth and successful marathon experience.
          </p>
          <p className="mt-6 text-sm text-muted-text">
            &copy; {new Date().getFullYear()} MarathonHub. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h6 className="text-text font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-highlight transition">Home</Link></li>
              <li><Link to="/marathons" className="hover:text-highlight transition">Marathons</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="text-text font-semibold mb-4">Account</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-highlight transition">Login</Link></li>
              <li><Link to="/registration" className="hover:text-highlight transition">Register</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="text-text font-semibold mb-4">Contact</h6>
            <ul className="space-y-2 text-sm">
              <li><a href="" className="hover:text-highlight transition">Email Us</a></li>
              <li><a href="" className="hover:text-highlight transition">Support Center</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
