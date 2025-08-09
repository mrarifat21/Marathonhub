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
    <div 
      className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl "
      style={{ 
        backgroundColor: 'var(--color-surfaceColor)',
        border: '2px solid var(--color-border)'
      }}
    >
      {/* Image Section */}
      <figure className="h-56 overflow-hidden relative">
        <img 
          src={imageURL} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </figure>
      
      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h2 
          className="text-xl font-bold leading-tight line-clamp-2"
          style={{ color: 'var(--color-highlight)' }}
        >
          {title}
        </h2>
        
        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">📍</span>
            <p 
              className="text-base font-medium flex-1"
              style={{ color: 'var(--color-text)' }}
            >
              {location}
            </p>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="text-lg">🗓️</span>
            <div className="flex-1">
              <p 
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Registration Period:
              </p>
              <div 
                className="text-sm space-y-1"
                style={{ color: 'var(--color-muted-text)' }}
              >
                <p><span className="font-semibold">From:</span> {startRegistrationDate}</p>
                <p><span className="font-semibold">To:</span> {endRegistrationDate}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <Link to={`/marathons/${_id}`} className="inline-block">
            <button 
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-md flex items-center gap-2"
              style={{ backgroundColor: 'var(--color-button)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-button-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-button)'}
            >
              <span>See Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      
      {/* Optional: Subtle hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent hover:from-blue-500/5 hover:to-transparent transition-all duration-300 pointer-events-none opacity-0 hover:opacity-100 rounded-xl"></div>
    </div>
  );
};

export default Marathon;