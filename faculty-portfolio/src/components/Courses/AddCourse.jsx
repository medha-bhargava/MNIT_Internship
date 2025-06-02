import React, { useState } from 'react';
import './AddCourse.css';

function AddCourse() {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');
    const [institute, setInstitute] = useState('');
    const [syllabusLink, setSyllabusLink] = useState('');
    const [classroomLink, setClassroomLink] = useState('');

    const handleAdd = async () => {
        if (!courseId || !courseName || !courseType || !institute || !syllabusLink ||!classroomLink) {
            alert('Please fill all course fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8083/api/courses/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, courseName, courseType, institute, syllabusLink, classroomLink }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Course added successfully!');
                setCourseId('');
                setCourseName('');
                setCourseType('');
                setInstitute('');
                setClassroomLink('');
                setSyllabusLink('');
            } else {
                alert(data.message || 'Something went wrong.');
            }
        } catch (err) {
            alert('Error connecting to server.');
            console.error(err);
        }
    };

    return (
        <div className="add-course-wrapper">
            <h2 className="heading">Add New Course</h2>

            <div className="row">
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Course ID"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <select
                        className='select'
                        value={courseType}
                        onChange={(e) => setCourseType(e.target.value)}
                    >
                        <option value="">--Select-Course-Type--</option>
                        <option value="Currently Teaching">Currently Teaching</option>
                        <option value="Previously Taught">Previously Taught</option>
                    </select>
                </div>
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Institute"
                        value={institute}
                        onChange={(e) => setInstitute(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Google Classroom Link"
                        value={classroomLink}
                        onChange={(e) => setClassroomLink(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Syllabus Link"
                        value={syllabusLink}
                        onChange={(e) => setSyllabusLink(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <button className="add-course-button" onClick={handleAdd}>
                        Add Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCourse;
