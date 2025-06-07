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
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(event.dateFrom);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
    };

    const filterByType = (type) => {
        if (type === 'Upcoming') {
            return events.filter(isUpcoming);
        } else if (type === 'Past') {
            return events.filter((event) => !isUpcoming(event));
        }
        return [];
    };

    const renderEvent = (event) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(event.dateFrom);
        eventDate.setHours(0, 0, 0, 0);
        const isPast = eventDate < today;

        return (
            <p key={event._id} className="eventItem">
                <strong>{event.eventTitle}</strong>, {event.institute}, {event.city}, {event.country} <br />
                <em>{new Date(event.dateFrom).toLocaleDateString()} - {new Date(event.dateTo).toLocaleDateString()}</em><br />
                {event.designation && <span><strong>Designation:</strong> {event.designation} | </span>}
                {event.sponsoredBy && <span><strong>Sponsored By:</strong> {event.sponsoredBy}</span>}
                {isPast && event.participationType && (
                    <div><em>{event.participationType}</em></div>
                )}
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
                        <Dropdown title="Upcoming" className="dropdown-upcoming">
                            {filterByType("Upcoming").length > 0 ? (
                                filterByType("Upcoming").map(renderEvent)
                            ) : (
                                <p className="no-event-records">No records found.</p>
                            )}
                        </Dropdown>
                    </div>
                    <div className="past">
                        <Dropdown title="Past" className="dropdown-past">
                            {filterByType("Past").length > 0 ? (
                                filterByType("Past").map(renderEvent)
                            ) : (
                                <p className="no-event-records">No records found.</p>
                            )}
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Events;
