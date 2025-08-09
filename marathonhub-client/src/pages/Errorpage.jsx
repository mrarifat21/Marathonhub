import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <>
      <NavBar />
      <main 
        className="min-h-screen px-6 py-24 flex flex-col items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)'
        }}
      >
        {/* Static background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full" 
               style={{ backgroundColor: 'var(--color-highlight)' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full" 
               style={{ backgroundColor: 'var(--color-button)' }}></div>
        </div>

        <div className={`max-w-2xl text-center transition-all duration-1000 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* 404 Display */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="text-8xl sm:text-9xl font-black tracking-wider opacity-20" 
                    style={{ color: 'var(--color-highlight)' }}>
                4
              </span>
              <div className="mx-4 relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--color-button)', color: 'white' }}>
                  <span className="text-2xl">🏃‍♂️</span>
                </div>
              </div>
              <span className="text-8xl sm:text-9xl font-black tracking-wider opacity-20" 
                    style={{ color: 'var(--color-highlight)' }}>
                4
              </span>
            </div>
            <p className="text-sm font-bold tracking-widest uppercase" 
               style={{ color: 'var(--color-warning)' }}>
              Page Not Found
            </p>
          </div>

          {/* Main Content */}
          <div 
            className="p-8 rounded-2xl shadow-lg mb-8"
            style={{ 
              backgroundColor: 'var(--color-surfaceColor)', 
              border: '1px solid var(--color-border)' 
            }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-6" 
                style={{ color: 'var(--color-text)' }}>
              Looks like you've gone off course!
            </h1>
            
            <p className="text-lg mb-6" style={{ color: 'var(--color-muted-text)' }}>
              Don't worry, even marathon runners sometimes take a wrong turn. 
              The page you're looking for might have crossed the finish line or taken a different route.
            </p>

            <div 
              className="p-4 rounded-lg mb-6"
              style={{ 
                backgroundColor: 'var(--color-background)', 
                border: '1px solid var(--color-border)' 
              }}
            >
              <p className="text-sm" style={{ color: 'var(--color-muted-text)' }}>
                <strong>What happened?</strong> The URL might be incorrect, the page may have been moved, 
                or you might not have permission to access this content.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
              style={{ 
                backgroundColor: 'var(--color-button)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-button-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-button)'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>

          
     
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;