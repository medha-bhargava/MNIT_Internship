import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SyllabusView.css';

const convertToPreviewLink = (link) => {
    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return link;
};

const SyllabusView = () => {
    const { courseId, year } = useParams();
    const [syllabusLink, setSyllabusLink] = useState('');
    const [courseName, setCourseName] = useState('');
    const [session, setSession] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [lecturePlan, setLecturePlan] = useState([]);
    const [showSyllabus, setShowSyllabus] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState('');

    useEffect(() => {
        const fetchSyllabus = async () => {
            try {
                const res = await fetch(`http://localhost:8083/api/courses/${courseId}`);
                const lecPlanRes = await fetch(`http://localhost:8083/api/courses/get-lecture-plan/${courseId}`)
                const data = await res.json();
                const lecPlanData = await lecPlanRes.json();

                if (res.ok) {
                    setCourseName(data.courseName);
                    setDescription(data.description || '');

                    const yearDetails = data.yearsTaught.find((y) => y.year === year);
                    if (yearDetails) {
                        setSession(yearDetails.session || '');
                        setLecturePlan(lecPlanData.lecturePlan || []);

                        if (yearDetails.syllabusLink) {
                            const preview = convertToPreviewLink(yearDetails.syllabusLink);
                            setSyllabusLink(preview);
                        }
                    } else {
                        console.warn("No data found for the selected year");
                    }
                } else {
                    console.error("Course not found");
                }
            } catch (err) {
                console.error('Error fetching course', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSyllabus();
    }, [courseId, year]);

    return (
        <div className="syllabus-view-container">
            {loading ? (
                <p>Loading syllabus...</p>
            ) : (
                <>
                    <h2 className="syllabus-title">
                        {courseId}: {courseName} ({session} {year})
                    </h2>

                    {description && (
                        <p className="course-description">
                            <strong>Description:</strong> {description}
                        </p>
                    )}

                    <p className="year"><strong>Year:</strong> {year}</p>

                    {syllabusLink && (
                        <>
                            <button className="toggle-button" onClick={() => setShowSyllabus(!showSyllabus)}>
                                {showSyllabus ? 'Hide Syllabus' : 'Show Syllabus'}
                            </button>

                            {showSyllabus && (
                                <div className="pdf-preview">
                                    <iframe
                                        src={syllabusLink}
                                        width="100%"
                                        height="600px"
                                        title="Syllabus PDF"
                                        frameBorder="0"
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                            )}
                        </>
                    )}

                    {lecturePlan.length > 0 && (
                        <>
                            <h3 className="lecture-plan-heading">Lecture Plan</h3>
                            <table className="lecture-table">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Lecture No.</th>
                                        <th style={{ textAlign: "center" }}>Date</th>
                                        <th style={{ textAlign: "center" }}>Lecture Title</th>
                                        <th style={{ textAlign: "center" }}>Study Material</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lecturePlan.map((lec, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>{lec.lectureNo}</td>
                                            <td style={{ textAlign: "center" }}>{lec.date}</td>
                                            <td>{lec.title}</td>
                                            <td style={{ textAlign: "center" }}>
                                                {lec.pdfLink && (
                                                    <a href={lec.pdfLink} target="_blank" rel="noopener noreferrer" className="material-link">
                                                        [PDF]
                                                    </a>
                                                )}
                                                {lec.pptLink && (
                                                    <a href={lec.pptLink} target="_blank" rel="noopener noreferrer" className="material-link">
                                                        [PPT]
                                                    </a>
                                                )}
                                                {!lec.pdfLink && !lec.pptLink && '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {lecturePlan.length === 0 && (
                        <p className="no-lectures">No lecture plan available for this year.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SyllabusView;
