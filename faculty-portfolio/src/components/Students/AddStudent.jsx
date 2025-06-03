import React, { useState } from 'react';
import './AddStudent.css';

function AddStudent() {
    const [student, setStudent] = useState({
        name: '',
        section: '',
        topic: '',
        year: '',
        status: '',
        institute: '',
    });

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1950; y--) {
        years.push(y);
    }

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const { name, section, topic, year, status, institute } = student;

        if (!name || !topic || !year || !section || !status || !institute) {
            alert('Please fill in all required fields.');
            return;
        }

        const payload = {
            sName: name,
            sDegree: section,
            sTitle: topic,
            sStatus: status,
            sInstitute: institute,
            sYear: parseInt(year),
        };

        try {
            const res = await fetch('http://localhost:8083/api/students/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Failed to add student');
            alert('Student added successfully!');
            setStudent({
                name: '',
                section: '',
                topic: '',
                year: '',
                status: '',
                institute: '',
            });
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="add-student-wrapper">
            <h2 className="heading">Add Student Supervised</h2>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        className="input"
                        placeholder="Student name"
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        name="topic"
                        value={student.topic}
                        onChange={handleChange}
                        className="input"
                        placeholder="Enter research topic"
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <select
                        name="section"
                        value={student.section}
                        onChange={handleChange}
                        className="select"
                        required
                    >
                        <option value="">--Degree--</option>
                        <option value="PhD">Ph.D</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Sc">M.Sc</option>
                    </select>
                </div>

                <div className="input-group">
                    <select
                        name="status"
                        value={student.status}
                        onChange={handleChange}
                        className="select"
                        required
                    >
                        <option value="">--Status--</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        name="institute"
                        value={student.institute}
                        onChange={handleChange}
                        className="input"
                        placeholder="Institute"
                        required
                    />
                </div>

                <div className="input-group">
                    <select
                        name="year"
                        value={student.year}
                        onChange={handleChange}
                        className="select"
                        required
                    >
                        <option value="">--Year--</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="button" onClick={handleSubmit} className="add-student-button">
                Add Student
            </button>
        </div>
    );
}

export default AddStudent;
