import React, { useEffect, useState } from "react";
import Marathon from "./Marathon";

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
      
      <div 
        className="min-h-screen py-12 px-4 md:px-6"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="text-4xl mr-3">🏃‍♂️</span>
              <h1 
                className="text-4xl md:text-5xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                All Marathons
              </h1>
              <span className="text-4xl ml-3">🏃‍♀️</span>
            </div>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted-text)' }}
            >
              Discover amazing marathon events across the country. Find your next challenge and join thousands of runners.
            </p>
          </div>

          {/* Controls Section */}
          <div 
            className="p-6 rounded-xl shadow-lg mb-8"
            style={{ 
              backgroundColor: 'var(--color-surfaceColor)', 
              border: '2px solid var(--color-border)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" style={{ color: 'var(--color-button)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <label 
                    htmlFor="sort" 
                    className="font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Sort by Date:
                  </label>
                </div>
                <select
                  id="sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                    focusRingColor: 'var(--color-button)'
                  }}
                >
                  <option value="desc">Newest to Oldest</option>
                  <option value="asc">Oldest to Newest</option>
                </select>
              </div>
              
              {/* Results count */}
              {!loading && !error && (
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-muted-text)' }}
                >
                  {marathons.length} {marathons.length === 1 ? 'marathon' : 'marathons'} found
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          {loading ? (
            <div 
              className="p-12 rounded-xl text-center shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-surfaceColor)', 
                border: '2px solid var(--color-border)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: 'var(--color-button)' }}
                ></div>
                <p 
                  className="text-lg font-medium"
                  style={{ color: 'var(--color-text)' }}
                >
                  Loading marathons...
                </p>
                <p style={{ color: 'var(--color-muted-text)' }}>
                  Finding the best races for you
                </p>
              </div>
            </div>
          ) : error ? (
            <div 
              className="p-12 rounded-xl text-center shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-surfaceColor)', 
                border: '2px solid var(--color-border)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-warning)' }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  Oops! Something went wrong
                </h3>
                <p style={{ color: 'var(--color-warning)' }}>
                  Error: {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
                  style={{ backgroundColor: 'var(--color-button)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-button-hover)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-button)'}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : marathons.length === 0 ? (
            <div 
              className="p-12 rounded-xl text-center shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-surfaceColor)', 
                border: '2px solid var(--color-border)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-background)' }}
                >
                  <span className="text-3xl">🏃‍♂️</span>
                </div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  No Marathons Available
                </h3>
                <p style={{ color: 'var(--color-muted-text)' }}>
                  Check back later for new marathon events!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Marathon Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {marathons.map((marathon) => (
                  <Marathon key={marathon._id} marathon={marathon} />
                ))}
              </div>

              
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Marathons;