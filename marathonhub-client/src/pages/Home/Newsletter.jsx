import React, { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

 
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You've successfully subscribed to our newsletter.",
    });

    setEmail("");
  };

  return (
    <section className="bg-surfaceColor text-text border border-border px-6 py-12 my-12 shadow-md transition-colors duration-300">
      <div className="w-11/12 mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold mb-4">Stay Updated</h2>
        <p className="text-muted-text mb-6">
          Subscribe to our newsletter for the latest marathon news, training tips, and event updates delivered right to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-3 w-full sm:w-auto flex-1 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          <button
            type="submit"
            className="bg-button hover:bg-button-hover text-surfaceColor px-6 py-3 font-semibold rounded-lg transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
