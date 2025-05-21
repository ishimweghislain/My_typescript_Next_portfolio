'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  animationDuration: number;
  delay: number;
}

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Create snowflakes
    const createSnowflakes = () => {
      const flakes: Snowflake[] = [];
      const count = 100; // Increased number of snowflakes for better effect

      for (let i = 0; i < count; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position (0-100%)
          size: Math.random() * 1.2 + 0.2, // Random size (0.2-1.4em)
          opacity: Math.random() * 0.8 + 0.2, // Random opacity (0.2-1)
          animationDuration: Math.random() * 15 + 10, // Random duration (10-25s)
          delay: Math.random() * 10, // Random delay (0-10s)
        });
      }

      setSnowflakes(flakes);
    };

    createSnowflakes();

    // Recreate snowflakes on window resize
    const handleResize = () => {
      createSnowflakes();
    };

    // Add periodic recreation of snowflakes for continuous effect
    const interval = setInterval(() => {
      createSnowflakes();
    }, 15000); // Recreate every 15 seconds

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  // Different snowflake characters for variety
  const snowflakeChars = ['❄', '❅', '❆', '✧', '✦'];

  return (
    <div className="snow-container">
      {snowflakes.map((flake) => {
        // Randomly select a snowflake character
        const snowChar = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

        return (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}em`,
              opacity: flake.opacity,
              animation: `snowfall ${flake.animationDuration}s linear infinite`,
              animationDelay: `${flake.delay}s`,
              filter: `blur(${Math.random() * 0.5}px)`,
              textShadow: `0 0 ${Math.random() * 5 + 2}px rgba(255, 255, 255, ${flake.opacity})`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {snowChar}
          </div>
        );
      })}
    </div>
  );
};

export default SnowEffect;
