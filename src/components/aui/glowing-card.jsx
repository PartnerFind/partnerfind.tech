import React from 'react';

const GlowingCard = ({ children, className }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative px-7 py-6 bg-black rounded-lg leading-none flex items-center">
        {children}
      </div>
    </div>
  );
};

export default GlowingCard;
