import React from "react";
import Banner from "./Banner";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import Marathon from "../Marathons/Marathon";
import UpcomingMarathons from "./UpcomingMarathons ";
import JoinAsOrganizer from "./JoinAsOrganizer ";
import MarathonGallery from "./MarathonGallery";
import { Helmet } from "react-helmet";

const Home = () => {
  const [marathons, setMarathons] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/marathons?limit=6`) 
      .then((res) => res.json())
      .then((data) => setMarathons(data.slice(0, 6))); 
  }, []);
  return (
    <>
     <Helmet>
      <title>Home | MarathonHub</title>
    </Helmet>
    <div>
      <Banner></Banner>
      {/* ====== display 6 marathon=======*/}
      <section className="w-11/12 mx-auto my-10">
        <h2 className="text-center text-3xl font-bold text-text mb-6">
           Marathons
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {marathons.map((marathon) => (
            <Marathon key={marathon._id} marathon={marathon} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/marathons"
            className="inline-block bg-button hover:bg-button-hover text-surface font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            View All Marathons
          </Link>
        </div>
      </section>
      {/* ========== */}
      <UpcomingMarathons></UpcomingMarathons>
      <MarathonGallery></MarathonGallery>
      <JoinAsOrganizer></JoinAsOrganizer>
    </div>
    </>
  );
};

export default Home;
