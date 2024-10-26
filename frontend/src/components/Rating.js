import React, { useEffect, useState } from 'react';

const Rating = ({ eventId, onRate }) => {
    const [rating, setRating] = useState(0);

    // Load the saved rating from local storage on component mount
    useEffect(() => {
        const savedRating = localStorage.getItem(`rating-${eventId}`);
        if (savedRating) {
            setRating(Number(savedRating));
        }
    }, [eventId]);

    const handleRating = (value) => {
        setRating(value);
        localStorage.setItem(`rating-${eventId}`, value); // Save the rating to local storage
        onRate(eventId, value); // Call the onRate callback
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleRating(star)}
                    style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default Rating;
