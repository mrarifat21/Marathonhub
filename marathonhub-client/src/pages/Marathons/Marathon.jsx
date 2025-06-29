import React from 'react';
import { Link } from 'react-router';

const Marathon = ({ marathon }) => {
  const {
    imageURL,
    title,
    location,
    startRegistrationDate,
    endRegistrationDate,
    _id
  } = marathon;
  return (
    <div className="card bg-background shadow-xl rounded-xl">
      <figure className="h-56 overflow-hidden">
        <img src={imageURL} alt={title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body text-text space-y-2">
        <h2 className="card-title text-highlight text-xl font-semibold">{title}</h2>
        <p className="text-lg">📍 <span className="font-medium">{location}</span></p>
        <p className="text-lg">
          🗓️ Registration: <span className="font-medium">{startRegistrationDate}</span> to <span className="font-medium">{endRegistrationDate}</span>
        </p>
        <div className="card-actions justify-end">
            <Link to={`/marathons/${_id}`}>
          <button className="btn bg-button text-background border-none hover:bg-button-hover">See Details</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Marathon;
