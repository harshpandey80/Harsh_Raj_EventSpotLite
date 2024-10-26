import React, { useEffect, useState } from 'react';
import Countdown from './Countdown'; // Import Countdown
import Rating from './Rating'; // Import Rating
import './EventDetailsModal.css';

const EventDetailsModal = ({ isOpen, onClose, event }) => {
    const [animationState, setAnimationState] = useState('fade-in scale-in');

    useEffect(() => {
        if (isOpen) {
            setAnimationState('fade-in scale-in');
        } else {
            setAnimationState('fade-out scale-out');
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimationState('fade-out scale-out');
        setTimeout(() => {
            onClose();
        }, 300); // Match this duration with the CSS animation duration
    };

    if (!isOpen || !event) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'fade-in' : 'fade-out'}`}>
            <div className={`modal-content ${animationState}`}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{event.name}</h2>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-3">{event.location}</p>
                <img width={200} height={90} src={event.imageUrl} alt="Event" />

                {/* Countdown Component */}
                <Countdown eventDate={event.date} />

                {/* Rating Component */}
                <Rating eventId={event._id} onRate={(id, value) => console.log(`Event ${id} rated with ${value}`)} />

                <button
                    onClick={handleClose}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EventDetailsModal;
