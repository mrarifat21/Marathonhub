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
    <div className="min-h-screen shadow-2xl flex items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full bg-background rounded-xl shadow-md p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image and Countdown */}
          <div className="md:w-1/2 relative">
            <img
              src={imageURL}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />

            {/* Countdown Timer at bottom-left of image */}
            <div className="absolute bottom-2 left-1 right-1 mx-auto md:bottom-4 md:left-4 md:right-auto z-10 flex justify-center">
              <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl shadow-2xl">
                <CountdownCircleTimer
                  isPlaying
                  duration={remainingTime}
                  colors={[
                    ["#00b894", 0.4],
                    ["#0984e3", 0.3],
                    ["#d63031", 0.2],
                  ]}
                  size={130}
                  strokeWidth={6}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            </div>
          </div>

          {/* Marathon Info */}
          <div className="md:w-1/2 space-y-4 text-text">
            <h2 className="text-3xl font-bold text-highlight">{title}</h2>
            <p className="text-lg text-muted-text">Organized by: {userName}</p>
            <p className="font-medium">📍 Location: {location}</p>
            <p className="font-medium">
              📆 Registration Start: {startRegistrationDate}
            </p>
            <p className="font-medium">
              📆 Registration End: {endRegistrationDate}
            </p>
            <p className="font-medium">🏁 Marathon Date: {marathonStartDate}</p>
            <p className="font-medium">📏 Distance: {runningDistance}</p>
            <p className="font-medium">
              👥 Registered Participants: {registrationCount}
            </p>
            <div className="mt-4">
              <p className="font-semibold">About:</p>
              <p className="text-justify">{description}</p>
            </div>

            <div className="pt-4 flex gap-5 flex-wrap">
              {isRegistrationOpen ? (
                <Link to="/marathonRegistration" state={{ marathon }}>
                  <button className="btn bg-button hover:bg-button-hover text-white rounded-xl border-none">
                    Register for Marathon
                  </button>
                </Link>
              ) : (
                <button
                  className="btn bg-gray-500 text-gray-600 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed rounded-xl border-none"
                  
                >
                  Registration Closed
                </button>
              )}
              <Link to={-1}>
                <button className="btn bg-button hover:bg-button-hover rounded-xl border-none">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;
