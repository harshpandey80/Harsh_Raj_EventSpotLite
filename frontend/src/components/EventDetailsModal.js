import React, { useEffect, useState } from 'react';
import Countdown from './Countdown';
import Rating from './Rating';
import './EventDetailsModal.css';
import CloseButton from '../assets/CloseButton.png';

const EventDetailsModal = ({ isOpen, onClose, event }) => {
    const [animationState, setAnimationState] = useState('flip-in');

    useEffect(() => {
        setAnimationState(isOpen ? 'flip-in' : 'flip-out');
    }, [isOpen]);

    const handleClose = () => {
        setAnimationState('flip-out');
        setTimeout(() => onClose(), 300);
    };

    if (!isOpen || !event) return null;

    return (
        <div className={`modal-overlay fade-in`}>
            <div className={`modal-content ${animationState}`}>
                <button onClick={handleClose} className="close-button" aria-label="Close">
                    <img src={CloseButton} height={50} width={50} alt="Close" />
                </button>
                <img src={event.imageUrl} alt="Event" className="event-image" />
                <div className="event-details">
                    <h2 className="event-title">{event.name}</h2>
                    <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="event-location">{event.location}</p>

                   
                    <div className="event-description">
                        {event.description}
                    </div>
                    
                    <Countdown eventDate={event.date} />
                    <Rating eventId={event._id} onRate={(id, value) => console.log(`Event ${id} rated with ${value}`)} />
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;
