import React, { useState } from 'react';
import './AddPublication.css'

function AddPublicationForm() {
    const [pId, setPubId] = useState('');
    const [pType, setPubType] = useState('');
    const [pTitle, setTitle] = useState('');
    const [pAuthors, setAuthors] = useState('');
    const [pVenue, setVenue] = useState('');
    const [pDate, setDate] = useState('');

    const handleAdd = async () => {
        console.log({ pId, pType, pTitle, pAuthors, pVenue, pDate });
        if (!pId || !pType || !pTitle || !pAuthors || !pVenue ||!pDate) {
            alert('Please fill all publication fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8083/api/publications/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pId, pType, pTitle, pAuthors, pVenue, pDate }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Publication added successfully!');
                setPubId('');
                setPubType('');
                setTitle('');
                setAuthors('');
                setVenue('');
                setDate('');
            } else {
                alert(data.message || 'Something went wrong.');
            }
        } catch (err) {
            alert('Error connecting to server.');
            console.error(err);
        }
    };

    return (
        <div className="add-publication-wrapper">
            <h2 className="heading">Add New Publication</h2>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Publication ID"
                        value={pId}
                        onChange={(e) => setPubId(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <select
                        value={pType}
                        onChange={(e) => setPubType(e.target.value)}
                    >
                        <option value="">--Select-Type--</option>
                        <option value="Journal">Journal</option>
                        <option value="Conference">Conference</option>
                        <option value="Book-Chapter">Book Chapter</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Publication Title"
                        value={pTitle}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Authors"
                        value={pAuthors}
                        onChange={(e) => setAuthors(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Venue"
                        value={pVenue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="date"
                        value={pDate}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-group">
                    <button className="add-button" onClick={handleAdd}>
                        Add Publication
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddPublicationForm;
