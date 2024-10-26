import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api';
import { toast } from 'react-toastify';
import './Home.css';
import EventDetailsModal from '../components/EventDetailsModal';
import EventCreationModal from '../components/EventCreationModal';

function Home() {
    // State variables hain yahan pe - events ki list, loading ka state, selected event, aur search query
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Jab tak data load ho raha hai, loading true rakhenge
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // Details modal ka state
    const [isCreationModalOpen, setIsCreationModalOpen] = useState(false); // Creation modal ka state
    const [query, setQuery] = useState(''); // User ka search input store karne ke liye
    const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events ka list

    // fetching data from backend and when componet get mounted it called automatically;
    useEffect(() => {
        const getEvents = async () => {
            try {
                const { data } = await fetchEvents(); // fetching data from Backend
                toast.success("Events fetched successfully!"); // Toast message for successful response
                setEvents(data); //setting the events
                setFilteredEvents(data); // By default showing all events
            } catch (error) {
                console.log(error); 
                toast.error(error.message); // showing error measage
            } finally {
                setLoading(false); // when data is fetched fe make it false then lodaer dissapear and data ui pe dikhega
            }
        };
        getEvents();
    }, []);

    // Yaha pe search query change hone par filtering ho rahi hai
    useEffect(() => {
        setFilteredEvents(
            events.filter(event =>
                event.name.toLowerCase().includes(query.toLowerCase()) || // Name ya location match kare toh filter karte hain
                event.location.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, events]); // Dependents hain query aur events, inmein change aaye toh ye effect chalega

    // function to open details modal
    const openDetailsModal = (event) => {
        setSelectedEvent(event); // Event select kar rahe hain
        setIsDetailsModalOpen(true); // Details modal ko open kar rahe hain
    };

    // function to close details modal
    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false); // Modal close ho jayega
        setSelectedEvent(null); // Selected event ko reset kar dete hain
    };

    // opening  Creation modal when user want to create new event
    const openCreationModal = () => {
        setIsCreationModalOpen(true); // Creation modal ko open kar rahe hain
    };

    // function to close creation modal
    const closeCreationModal = () => {
        
        setIsCreationModalOpen(false); // Creation modal ko close kar rahe hain
    };

    // when new event is created updated events ko fetch karte hain
    const handleEventCreated = async () => {
        const { data } = await fetchEvents(); // Updated list fetch karte hain
        setEvents(data);
    };

    // if loadinf is true to loading message dikhate hain
    if (loading) {
        return <div className="text-center py-4">Loading events...</div>;
    }

    // when modal open background effect add karna hai
    const isModalOpen = isDetailsModalOpen || isCreationModalOpen;

    return (
        <div className={`max-w-4xl  mx-auto p-4 ${isModalOpen ? 'modal-open' : ''}`}>
            <div className="parallax">
                <h1 className="text-5xl font-bold mb-6 text-center">Events</h1>

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
                    // we are showing  filtered events ko list kar rahe hain
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredEvents.map((event, index) => (
                           <div
                               key={event._id}
                               className="event-card bg-white rounded-lg shadow-lg p-4 cursor-pointer transition-transform transition-opacity duration-300 ease-out transform hover:scale-105 hover:opacity-90"
                               style={{ animationDelay: `${index * 0.1}s` }} // Delay ke saath animation effect hai
                               onClick={() => openDetailsModal(event)}
                           >
                               <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
                               <p className="text-gray-600 mb-1">{new Date(event.date).toLocaleDateString()}</p>
                               <p className="text-gray-600">{event.location}</p>
                           </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">No events match your search criteria.</div> // Agar kuch match nahi karta then no event is matching to query
                )}
            </div>
            
            {/* Event details modal */}
            <EventDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
                event={selectedEvent}
            />

            {/* Event creation modal */}
            <EventCreationModal
                isOpen={isCreationModalOpen}
                onClose={closeCreationModal}
                onEventCreated={handleEventCreated}
            />
        </div>
    );
}

export default Home;
