import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-surfaceColor to-surfaceColor/90 text-text border-t border-border px-6 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-extrabold text-highlight mb-4">MarathonHub</h2>
          <p className="text-muted-text leading-relaxed max-w-sm">
            Your trusted platform for discovering, registering, and managing marathon events.
            Whether you're a runner or organizer, we help you go the extra mile.
          </p>
          <p className="mt-6 text-sm text-muted-text">
            &copy; {new Date().getFullYear()} MarathonHub. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-highlight transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marathons" className="hover:text-highlight transition-colors duration-200">
                  Marathons
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4">Account</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-highlight transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/registration" className="hover:text-highlight transition-colors duration-200">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Follow Us</h6>
            <div className="flex space-x-4 text-xl">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
                { icon: <FaLinkedinIn />, link: "https://linkedin.com" }
              ].map(({ icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-highlight/10 hover:bg-highlight hover:text-white transition-colors duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
