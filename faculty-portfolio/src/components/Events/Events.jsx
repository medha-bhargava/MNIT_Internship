import { useEffect, useState } from 'react';
import './Events.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8083/api/events/all');
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            }
        };

        fetchEvents();
    }, []);

    const isUpcoming = (event) => {
        const today = new Date();
        return new Date(event.dateFrom) >= today;
    };

    const filterByType = (type) => {
        return type === 'Upcoming'
            ? events.filter(isUpcoming)
            : events.filter((event) => !isUpcoming(event));
    };

    const renderEvent = (event) => {
        return (
            <p key={event._id}>
                <strong>{event.eventTitle}</strong>, {event.institute}, {event.city}, {event.country} <br />
                <em>{new Date(event.dateFrom).toLocaleDateString()} - {new Date(event.dateTo).toLocaleDateString()}</em><br />
                {event.designation && <span><strong>Designation:</strong> {event.designation} | </span>}
                {event.sponsoredBy && <span><strong>Sponsored By:</strong> {event.sponsoredBy}</span>}
            </p>
        );
    };

    return (
        <>
            <Navbar />
            <div className="eventBox">
                <h1>Events</h1>
                <div className="events">
                    <div className="upcoming">
                        <Dropdown title="Upcoming">
                            {filterByType("Upcoming").map(renderEvent)}
                        </Dropdown>
                    </div>
                    <div className="past">
                        <Dropdown title="Past">
                            {filterByType("Past").map(renderEvent)}
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Events;
