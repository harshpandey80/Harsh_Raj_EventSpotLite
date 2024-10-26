// src/components/Countdown.js
import React, { useEffect, useState } from "react";

const Countdown = ({ eventDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = new Date(eventDate).getTime();
      const distance = eventTime - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [eventDate]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold">Event starts in:</h2>
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl">{timeRemaining.days}</span>
          <span className="text-gray-500">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">{timeRemaining.hours}</span>
          <span className="text-gray-500">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">{timeRemaining.minutes}</span>
          <span className="text-gray-500">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">{timeRemaining.seconds}</span>
          <span className="text-gray-500">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
