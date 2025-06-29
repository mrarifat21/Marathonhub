import React from "react";
import { Link } from "react-router";

const JoinAsOrganizer = () => {
  return (
    <section className="bg-background text-text border border-border px-6 py-12 my-12  shadow-md transition-colors duration-300">
      <div className="w-11/12 mx-auto">
        <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-4">Become a Marathon Organizer</h2>
        <p className="text-muted-text mb-6">
          Are you planning a marathon event? Partner with MarathonHub to get exposure, registration tools, and community support. Hosting a marathon has never been easier!
        </p>
        <Link to="">
          <button className="bg-button hover:bg-button-hover text-surfaceColor px-6 py-3 font-semibold rounded-lg transition duration-300">
            Join as Organizer
          </button>
        </Link>
      </div>
      </div>
    </section>
  );
};

export default JoinAsOrganizer;
