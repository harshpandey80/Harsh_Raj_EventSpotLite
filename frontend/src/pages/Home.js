// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api';
import { toast } from 'react-toastify';
import './Home.css';
import EventDetailsModal from '../components/EventDetailsModal';
import EventCreationModal from '../components/EventCreationModal';

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
    const [query, setQuery] = useState(''); // Search query
    const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events

    useEffect(() => {
        const getEvents = async () => {
            try {
                const { data } = await fetchEvents();
                toast.success("Events fetched successfully!");
                setEvents(data);
                setFilteredEvents(data); // Display all events initially
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, []);

    // Update filtered events based on search query
    useEffect(() => {
        setFilteredEvents(
            events.filter(event =>
                event.name.toLowerCase().includes(query.toLowerCase()) ||
                event.location.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, events]);

    const openDetailsModal = (event) => {
        setSelectedEvent(event);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedEvent(null);
    };

    const openCreationModal = () => {
        setIsCreationModalOpen(true);
    };

    const closeCreationModal = () => {
        setIsCreationModalOpen(false);
    };

    const handleEventCreated = async () => {
        const { data } = await fetchEvents();
        setEvents(data);
    };

    if (loading) {
        return <div className="text-center py-4">Loading events...</div>;
    }

    // Determine if any modal is open to apply background effect
    const isModalOpen = isDetailsModalOpen || isCreationModalOpen;

    return (
        <div className={`max-w-4xl mx-auto p-4 ${isModalOpen ? 'modal-open' : ''}`}>
            <div className="parallax">
                <h1 className="text-2xl font-bold mb-6 text-center">Upcoming Events</h1>
                
                {/* Search Input Field */}
                <input
                    type="text"
                    placeholder="Search by name or location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input mb-4 p-2 border rounded-md w-full"
                />

                <button
                    onClick={openCreationModal}
                    className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                    Create Event
                </button>

                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredEvents.map((event, index) => (
                           <div
                               key={event._id}
                               className="event-card bg-white rounded-lg shadow-lg p-4 cursor-pointer transition-transform transition-opacity duration-300 ease-out transform hover:scale-105 hover:opacity-90"
                               style={{ animationDelay: `${index * 0.1}s` }}
                               onClick={() => openDetailsModal(event)}
                           >
                               <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
                               <p className="text-gray-600 mb-1">{new Date(event.date).toLocaleDateString()}</p>
                               <p className="text-gray-600">{event.location}</p>
                           </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">No events match your search criteria.</div>
                )}
            </div>
            <EventDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
                event={selectedEvent}
            />
            <EventCreationModal
                isOpen={isCreationModalOpen}
                onClose={closeCreationModal}
                onEventCreated={handleEventCreated}
            />
        </div>
    );
}

export default Home;
