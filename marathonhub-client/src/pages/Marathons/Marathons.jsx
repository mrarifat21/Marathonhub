import React, { useEffect, useState } from "react";
import Marathon from "./Marathon";
import {Helmet} from "react-helmet";
const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchMarathons = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/marathons?sortOrder=${sortOrder}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch marathons");
        }
        const data = await res.json();
        setMarathons(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMarathons();
  }, [sortOrder]);

  return (
    <>
    <Helmet>
      <title>Marathons</title>
    </Helmet>
    <div className="w-11/12 mx-auto">
      <h2 className="text-center text-3xl text-text my-3 font-bold">All Marathons</h2>

      <div className="flex justify-center mb-5 gap-3">
        <label htmlFor="sort" className="text-text font-semibold self-center">
          Sort by Created Date:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select rounded-md bg-surfaceColor  text-text border-1 border-border"
        >
          <option value="desc">Newest to Oldest</option>
          <option value="asc">Oldest to Newest</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center mt-10 text-text">Loading marathons...</div>
      ) : error ? (
        <div className="text-center mt-10 text-red-600">Error: {error}</div>
      ) : marathons.length === 0 ? (
        <p className="text-center text-muted-text">No marathons available</p>
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-8 my-5">
          {marathons.map((marathon) => (
            <Marathon key={marathon._id} marathon={marathon} />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Marathons;
