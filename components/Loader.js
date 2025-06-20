// components/Loader.js
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === 3 ? 0 : prev + 1));
    }, 500); // Change dots every 500ms

    const timeout = setTimeout(() => {
      onComplete();
    }, 3000); // Loader completes after 3 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900">
      <div className="flex items-center space-x-2">
        {/* Animal */}
        <div className="w-28 h-28">
          <Image
            src={'/Bird.gif'}
            alt="Loading..."
            className="w-full h-full object-contain "
            width={72}
            height={72}
            priority
            unoptimized
          />
        </div>
        {/* Dots */}
        <div className="flex">
          {[...Array(3)].map((_, index) => (
            <span
              key={index}
              className={`w-4 h-4 rounded-full bg-black dark:bg-white mx-1 transition-opacity duration-300 ${
                index < dots ? 'opacity-100' : 'opacity-20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;