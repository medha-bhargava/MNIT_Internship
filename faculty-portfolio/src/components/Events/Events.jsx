import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Events.css';

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8083/api/events/all'); // Update route if needed
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <Navbar />
            <div className="events-container">
                <h1 className="events-title">Events</h1>

                <div className="events-wrapper">
                    {events.length === 0 ? (
                        <p className="events-intro">No events found. Please add some events.</p>
                    ) : (
                        events.map((event, index) => (
                            <div key={index} className="event-card">
                                <h3 className="event-heading">{event.eventTitle}</h3>
                                <p><strong>Category:</strong> {event.category}</p>
                                <p><strong>Type:</strong> {event.eventType}</p>
                                <p><strong>Venue:</strong> {event.institute}, {event.city}, {event.country}</p>
                                <p><strong>Duration:</strong> {event.dateFrom} to {event.dateTo}</p>
                                <p><strong>Designation:</strong> {event.designation}</p>
                                <p><strong>Sponsored By:</strong> {event.sponsoredBy}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Events;
