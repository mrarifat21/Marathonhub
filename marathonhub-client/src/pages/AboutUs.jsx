import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <div className="py-12 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--color-text)' }}>
            About Marathon Hub
          </h1>

          <div 
            className="p-6 mb-8 rounded-lg shadow-sm"
            style={{ 
              backgroundColor: 'var(--color-surfaceColor)', 
              border: '1px solid var(--color-border)' 
            }}
          >
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text)' }}>
              <strong style={{ color: 'var(--color-highlight)' }}>Marathon Hub</strong> is your ultimate platform for discovering, registering, and tracking marathons across the country.
              Whether you're a seasoned athlete or a first-time runner, Marathon Hub connects you with exciting events and provides tools to manage your participation with ease.
            </p>
          </div>

          <div 
            className="p-6 mb-8 rounded-lg shadow-sm"
            style={{ 
              backgroundColor: 'var(--color-surfaceColor)', 
              border: '1px solid var(--color-border)' 
            }}
          >
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-highlight)' }}>
              Why We Built Marathon Hub
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--color-muted-text)' }}>
              Marathon registration and event management can be frustrating—confusing forms, scattered event info, and poor communication. We built Marathon Hub to simplify everything.
              From easy event discovery to secure registration, real-time updates, and a personalized dashboard—our goal is to make your marathon experience smooth and memorable.
            </p>
          </div>

          <div 
            className="p-6 mb-8 rounded-lg shadow-sm"
            style={{ 
              backgroundColor: 'var(--color-surfaceColor)', 
              border: '1px solid var(--color-border)' 
            }}
          >
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-highlight)' }}>
              What We Offer
            </h2>
            <ul className="space-y-3" style={{ color: 'var(--color-muted-text)' }}>
              <li className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <span>Browse upcoming marathons with full event details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✅</span>
                <span>Easy and secure registration system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <span>Location-based event search</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">👤</span>
                <span>Personalized dashboard to track your registered marathons</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🔐</span>
                <span>Secure authentication & data management</span>
              </li>
            </ul>
          </div>

          <div 
            className="p-6 rounded-lg shadow-sm"
            style={{ 
              backgroundColor: 'var(--color-surfaceColor)', 
              border: '1px solid var(--color-border)' 
            }}
          >
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-highlight)' }}>
              Join the Community
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--color-muted-text)' }}>
              Whether you're running for fun, fitness, or a personal best, Marathon Hub is here to support your journey. Discover new races, connect with fellow runners, and make each stride count.
            </p>
            <p className="text-center font-medium" style={{ color: 'var(--color-text)' }}>
              Thanks for being part of our community! 🏃‍♂️🏃‍♀️
            </p>
          </div>

          {/* Call-to-action button */}
          <div className="text-center mt-8">
           <Link to='/marathons'>
            <button 
              className="px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-button)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-button-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-button)'}
            >
              Start Your Marathon Journey
            </button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;