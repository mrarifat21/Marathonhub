import React from "react";
import { Link, useLoaderData } from "react-router";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MarathonDetails = () => {
  const marathon = useLoaderData();
  const {
    imageURL,
    title,
    startRegistrationDate,
    endRegistrationDate,
    marathonStartDate,
    location,
    runningDistance,
    description,
    registrationCount,
    userName
  } = marathon;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(startRegistrationDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(endRegistrationDate);
  endDate.setHours(0, 0, 0, 0);

  const isRegistrationOpen = today >= startDate && today <= endDate;

  const marathonTime = new Date(marathonStartDate).getTime();
  const nowTime = Date.now();
  const remainingTime = Math.max(
    0,
    Math.floor((marathonTime - nowTime) / 1000)
  );

  const renderTime = ({ remainingTime }) => {
    const days = Math.floor(remainingTime / (60 * 60 * 24));
    const hours = Math.floor((remainingTime % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);

    return (
      <div className="text-center text-white">
        <div className="text-sm font-semibold tracking-wide uppercase">
          Time Left
        </div>
        <div className="text-lg font-bold">
          {days}d {hours}h {minutes}m
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 md:px-6"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            Marathon Details
          </h1>
          <p 
            className="text-lg"
            style={{ color: 'var(--color-muted-text)' }}
          >
            Everything you need to know about this exciting event
          </p>
        </div>

        {/* Main Content Card */}
        <div 
          className="rounded-2xl shadow-2xl p-6 md:p-10"
          style={{ 
            backgroundColor: 'var(--color-surfaceColor)',
            border: '2px solid var(--color-border)'
          }}
        >
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Image and Countdown Section */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={imageURL}
                  alt={title}
                  className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
                />
                
                {/* Countdown Timer Overlay */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div 
                    className="p-4 rounded-2xl shadow-2xl backdrop-blur-md"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                  >
                    <CountdownCircleTimer
                      isPlaying
                      duration={remainingTime}
                      colors={[
                        ["#00b894", 0.4],
                        ["#0984e3", 0.3],
                        ["#d63031", 0.2],
                      ]}
                      size={120}
                      strokeWidth={6}
                    >
                      {renderTime}
                    </CountdownCircleTimer>
                  </div>
                </div>

                {/* Registration Status Badge */}
                <div className="absolute top-4 right-4">
                  <div 
                    className="px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                    style={{ 
                      backgroundColor: isRegistrationOpen ? 'var(--color-button)' : 'var(--color-warning)',
                      color: 'white'
                    }}
                  >
                    {isRegistrationOpen ? '✅ Open for Registration' : '❌ Registration Closed'}
                  </div>
                </div>
              </div>
            </div>

            {/* Marathon Information Section */}
            <div className="lg:w-1/2 space-y-6">
              {/* Title and Organizer */}
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                  style={{ color: 'var(--color-highlight)' }}
                >
                  {title}
                </h2>
                <p 
                  className="text-lg font-medium"
                  style={{ color: 'var(--color-muted-text)' }}
                >
                  Organized by: <span style={{ color: 'var(--color-text)' }}>{userName}</span>
                </p>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📍</span>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Location</span>
                  </div>
                  <p style={{ color: 'var(--color-muted-text)' }}>{location}</p>
                </div>

                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📏</span>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Distance</span>
                  </div>
                  <p style={{ color: 'var(--color-muted-text)' }}>{runningDistance}</p>
                </div>

                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🏁</span>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Event Date</span>
                  </div>
                  <p style={{ color: 'var(--color-muted-text)' }}>{marathonStartDate}</p>
                </div>

                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">👥</span>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Participants</span>
                  </div>
                  <p style={{ color: 'var(--color-muted-text)' }}>{registrationCount} registered</p>
                </div>
              </div>

              {/* Registration Period */}
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📅</span>
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Registration Period</span>
                </div>
                <div className="space-y-2">
                  <p style={{ color: 'var(--color-muted-text)' }}>
                    <span className="font-medium">Start:</span> {startRegistrationDate}
                  </p>
                  <p style={{ color: 'var(--color-muted-text)' }}>
                    <span className="font-medium">End:</span> {endRegistrationDate}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--color-text)' }}>
                  About This Marathon
                </h3>
                <p className="text-justify leading-relaxed" style={{ color: 'var(--color-muted-text)' }}>
                  {description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {isRegistrationOpen ? (
                  <Link to="/marathonRegistration" state={{ marathon }} className="flex-1">
                    <button 
                      className="w-full px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                      style={{ backgroundColor: 'var(--color-button)' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-button-hover)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-button)'}
                    >
                      🏃‍♂️ Register for Marathon
                    </button>
                  </Link>
                ) : (
                  <button 
                    className="flex-1 px-8 py-4 rounded-xl font-semibold cursor-not-allowed shadow-lg opacity-50"
                    style={{ 
                      backgroundColor: 'var(--color-warning)',
                      color: 'white'
                    }}
                    disabled
                  >
                    ❌ Registration Closed
                  </button>
                )}
                
                <Link to={-1} className="flex-1 sm:flex-initial">
                  <button 
                    className="w-full px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-text)',
                      border: '2px solid var(--color-border)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'var(--color-button)';
                      e.target.style.color = 'var(--color-button)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'var(--color-border)';
                      e.target.style.color = 'var(--color-text)';
                    }}
                  >
                    ← Go Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;