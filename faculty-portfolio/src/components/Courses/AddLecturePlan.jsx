import React, { useState, useEffect } from 'react';
import './AddLecturePlan.css';

const AddLecturePlan = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [lecturePlan, setLecturePlan] = useState([
        { lectureNo: '', date: '', title: '', pdfLink: '', pptLink: '' }
    ]);

    useEffect(() => {
        // Fetch courses for dropdown
        const fetchCourses = async () => {
            const response = await fetch('http://localhost:8083/api/courses/all');
            const data = await response.json();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    // Fetch lecture plan when a course is selected
    useEffect(() => {
        const fetchLecturePlan = async () => {
            try {
                const response = await fetch(`http://localhost:8083/api/courses/get-lecture-plan/${selectedCourseId}`);
                const data = await response.json();
                console.log("Fetched Lecture Plan:", data); // Debugging
                setLecturePlan(data.lecturePlan || []);
            } catch (err) {
                console.error("Error fetching lecture plan:", err);
            }
        };

        if (selectedCourseId) {
            fetchLecturePlan();
        }
    }, [selectedCourseId]);
    
    const handleLectureChange = (index, field, value) => {
        const updated = [...lecturePlan];
        updated[index][field] = value;
        setLecturePlan(updated);
    };

    const addLecture = () => {
        setLecturePlan([...lecturePlan, { lectureNo: '', date: '', title: '', pdfLink: '', pptLink: '' }]);
    };

    const removeLecture = (index) => {
        const updated = [...lecturePlan];
        updated.splice(index, 1);
        setLecturePlan(updated);
    };

    const handleSubmit = async () => {
        if (!selectedCourseId) {
            alert('Please select a course');
            return;
        }

        for (const lec of lecturePlan) {
            if (!lec.lectureNo || !lec.date || !lec.title) {
                alert('Please fill all lecture details');
                return;
            }
        }

        try {
            const response = await fetch(`http://localhost:8083/api/courses/add-lecture-plan/${selectedCourseId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: selectedCourseId,
                    yearEntry: {
                        lecturePlan
                    }
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Lecture Plan added successfully!');
                setLecturePlan([{ lectureNo: '', date: '', title: '', pdfLink: '', pptLink: '' }]);
                setSelectedCourseId('');
            } else {
                alert(data.message || 'Failed to add lecture plan');
            }
        } catch (err) {
            alert('Server error');
            console.error(err);
        }
    };

    return (
        <div className="add-lecture-plan-wrapper">
            <h2 className="headingL">Add Lecture Plan</h2>
            <div className="input-groupL">
                <select
                    className="selectL"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                    <option value="">-- Select Course --</option>
                    {courses.map((c, idx) => (
                        <option key={idx} value={c.courseId}>{c.courseName} ({c.courseId})</option>
                    ))}
                </select>
            </div>
            <h3 className="h3">Add Lecture</h3>
            {lecturePlan.map((lec, idx) => (
                <div className="lecture-row" key={idx}>
                    <input
                        className="inputL smallL"
                        type="text"
                        placeholder="Lecture No."
                        value={lec.lectureNo}
                        onChange={(e) => handleLectureChange(idx, 'lectureNo', e.target.value)}
                    />
                    <input
                        className="inputL smallL"
                        type="date"
                        value={lec.date}
                        onChange={(e) => handleLectureChange(idx, 'date', e.target.value)}
                    />
                    <input
                        className="inputL mediumL"
                        type="text"
                        placeholder="Title"
                        value={lec.title}
                        onChange={(e) => handleLectureChange(idx, 'title', e.target.value)}
                    />
                    <input
                        className="inputL"
                        type="text"
                        placeholder="PDF Link"
                        value={lec.pdfLink}
                        onChange={(e) => handleLectureChange(idx, 'pdfLink', e.target.value)}
                    />
                    <input
                        className="inputL"
                        type="text"
                        placeholder="PPT Link"
                        value={lec.pptLink}
                        onChange={(e) => handleLectureChange(idx, 'pptLink', e.target.value)}
                    />
                    {idx > 0 && (
                        <button className="remove-lecture-btnL" onClick={() => removeLecture(idx)}>❌</button>
                    )}
                </div>
            ))}
            <button className="add-buttonL" onClick={addLecture}>+ Add Lecture</button>
            <div className="addBtn">
                <button className="submit-buttonL" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default AddLecturePlan;
