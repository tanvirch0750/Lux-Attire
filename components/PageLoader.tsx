import React from 'react';

const PageLoader = () => {
  const text = 'Luxe Attire';
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4 mt-[-100px]">
      {/* Bouncing dots animation */}
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-brand rounded-full animate-bounce1"></div>
        <div className="w-4 h-4 bg-brand rounded-full animate-bounce2"></div>
        <div className="w-4 h-4 bg-brand rounded-full animate-bounce3"></div>
      </div>

      {/* Animated Luxe Attire Text */}
      <div className="flex space-x-1">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            className="text-3xl font-bold text-primary inline-block animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }} // Delay each letter's animation
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PageLoader;
