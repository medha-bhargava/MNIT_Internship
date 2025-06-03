import { useState } from 'react';
import './AddEvent.css';

function AddEvent() {
    const [formData, setFormData] = useState({
        category: '',
        eventTitle: '',
        eventType: '',
        institute: '',
        city: '',
        country: '',
        dateFrom: '',
        dateTo: '',
        designation: '',
        sponsoredBy: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData);
            const response = await fetch('http://localhost:8083/api/events/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                alert('Event added successfully!');
                setFormData({
                    category: '',
                    eventTitle: '',
                    eventType: '',
                    institute: '',
                    city: '',
                    country: '',
                    dateFrom: '',
                    dateTo: '',
                    designation: '',
                    sponsoredBy: '',
                });
            } else {
                alert('Failed to add event.');
            }
        } catch (err) {
            console.error('Submission error:', err);
            alert('Error submitting event.');
        }
    };

    return (
        <div className="add-event-wrapper">
            <h2 className="h2Head">Add Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-group">
                        <select className="select" name="category" value={formData.category} onChange={handleChange}>
                            <option value="">--Category of Event--</option>
                            <option value="Conference">Conference</option>
                            <option value="Workshop">Workshop</option>
                            <option value="FDP">FDP</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Guest Lecture">Guest Lecture</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="eventTitle"
                            className="input"
                            placeholder="Event Title"
                            value={formData.eventTitle}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <select
                            name="eventType"
                            className="input"
                            value={formData.eventType}
                            onChange={handleChange}
                        >
                            <option value="">--Type of Event--</option>
                            <option value="International">International</option>
                            <option value="National">National</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="designation"
                            className="input"
                            placeholder="Designation for Event"
                            value={formData.designation}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="institute"
                            className="input"
                            placeholder="Institute"
                            value={formData.institute}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="city"
                            className="input"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="country"
                            className="input"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <label>Date From</label>
                        <input
                            type="date"
                            name="dateFrom"
                            className="date input"
                            value={formData.dateFrom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Date To</label>
                        <input
                            type="date"
                            name="dateTo"
                            className="date input"
                            value={formData.dateTo}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="sponsoredBy"
                            className="input"
                            placeholder="Sponsored By"
                            value={formData.sponsoredBy}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="add-event-button">Add Event</button>
            </form>
        </div>
    );
}

export default AddEvent;
