import React, { useEffect, useState } from 'react';

const Rating = ({ eventId, onRate }) => {
    const [rating, setRating] = useState(0);

   
    useEffect(() => {
        const savedRating = localStorage.getItem(`rating-${eventId}`);
        if (savedRating) {
            setRating(Number(savedRating));
        }
    }, [eventId]);

    const handleRating = (value) => {
        setRating(value);
        localStorage.setItem(`rating-${eventId}`, value);
        onRate(eventId, value);
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl cursor-pointer transition-colors duration-300 ease-in-out ${
                        star <= rating ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default Rating;
