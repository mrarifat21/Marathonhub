import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-text py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-muted-text">About Marathon Hub</h1>

        <p className="text-lg mb-6 text-text leading-relaxed">
          <strong>Marathon Hub</strong> is your ultimate platform for discovering, registering, and tracking marathons across the country.
          Whether you're a seasoned athlete or a first-time runner, Marathon Hub connects you with exciting events and provides tools to manage your participation with ease.
        </p>

        <div className="divider"></div>

        <h2 className="text-2xl font-semibold mb-4 text-highlight">Why We Built Marathon Hub</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Marathon registration and event management can be frustrating—confusing forms, scattered event info, and poor communication. We built Marathon Hub to simplify everything.
          From easy event discovery to secure registration, real-time updates, and a personalized dashboard—our goal is to make your marathon experience smooth and memorable.
        </p>

        <div className="divider"></div>

        <h2 className="text-2xl font-semibold mb-4 text-highlight">What We Offer</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li>📅 Browse upcoming marathons with full event details</li>
          <li>✅ Easy and secure registration system</li>
          <li>📍 Location-based event search</li>
          <li>👤 Personalized dashboard to track your registered marathons</li>
          <li>🔐 Secure authentication & data management</li>
        </ul>

        <div className="divider"></div>

        <h2 className="text-2xl font-semibold mb-4 text-highlight">Join the Community</h2>
        <p className="text-gray-400 leading-relaxed">
          Whether you're running for fun, fitness, or a personal best, Marathon Hub is here to support your journey. Discover new races, connect with fellow runners, and make each stride count.
          <br /><br />
          Thanks for being part of our community! 🏃‍♂️🏃‍♀️
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
