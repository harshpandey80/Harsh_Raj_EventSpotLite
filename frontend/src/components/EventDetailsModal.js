// src/components/EventDetailsModal.js
import React, { useEffect, useState } from 'react';
import './EventDetailsModal.css';

const EventDetailsModal = ({ isOpen, onClose, event }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            // Delay setting `show` to false to allow exit animation
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!show) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'fade-in' : 'fade-out'}`} onClick={onClose}>
            <div
                className={`modal-content ${isOpen ? 'scale-in' : 'scale-out'}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{event?.name}</h2>
                <p className="text-gray-600">{event && new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-3">{event?.location}</p>
                {event?.imageUrl && (
                    <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="w-full h-40 object-cover mb-4 rounded-md shadow-md"
                    />
                )}
                <p className="text-gray-800 mb-4">{event?.description}</p>
                <button
                    onClick={onClose}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EventDetailsModal;
