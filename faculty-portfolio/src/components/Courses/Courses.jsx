import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import './Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('token');
  const canAccessClassroom = (role === 'student' || role === 'admin') && isLoggedIn;
  const [expandedCourseName, setExpandedCourseName] = useState(null);



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:8083/api/courses/all');
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Separate courses by type
  const currentlyTeaching = courses.filter(c => c.courseType === 'Currently Teaching');
  const previouslyTaught = courses.filter(c => c.courseType === 'Previously Taught');

  return (
    <>
      <Navbar />
      <div className="coursesBox">
        <h1>Courses Taught</h1>

        {/* {loading && <p>Loading courses...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>} */}

        {!loading && !error && (
          <div className="courses">
            <div className="latest">
              <Dropdown title="Currently Teaching" className="dropdown-currently">
                {currentlyTeaching.length > 0 ? (
                  currentlyTeaching.map(course => (
                    // <p key={course.courseId}>
                    //   <Link to={`/courses/${encodeURIComponent(course.courseName)}`} className="course-link">
                    //     {`${course.courseId}: ${course.courseName} (${course.institute})`}
                    //   </Link>
                    // </p>
                    <div key={course.courseId} className="course-item">
                      <p
                        className="course-link"
                        style={{ cursor: 'pointer', marginBottom: '7px' }}
                        onClick={() =>
                          setExpandedCourseName(
                            expandedCourseName === course.courseName ? null : course.courseName
                          )
                        }
                      >
                        {`${course.courseId}: ${course.courseName} (${course.institute})`}
                        {expandedCourseName === course.courseName && (
                          <div className="course-details-inline" style={{ marginLeft: '15px' }}>
                            <button
                              className="syllabus-button"
                              onClick={() => {
                                if (course.syllabusLink) window.open(course.syllabusLink, '_blank');
                                else alert('Syllabus not available');
                              }}
                            >
                              View Syllabus
                            </button>
                            <button
                              className="classroom-button"
                              onClick={() => {
                                const role = localStorage.getItem('role');
                                if (course.classroomLink && (role === 'student' || role === 'admin')) {
                                  window.open(course.classroomLink, '_blank');
                                } else if (!course.classroomLink) {
                                  alert('Classroom link not available.');
                                } else {
                                  alert('You need to login as student or admin to access classroom.');
                                }
                              }}
                            >
                              Go to Classroom
                            </button>
                          </div>
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No record found.</p>
                )}
              </Dropdown>
            </div>

            <div className="till_date">
              <Dropdown title="Previously Taught" className="dropdown-previously">
                {previouslyTaught.length > 0 ? (
                  previouslyTaught.map(course => (
                    // <p key={course.courseId}>
                    //   <Link to={`/courses/${encodeURIComponent(course.courseName)}`} className="course-link">
                    //     {`${course.courseId}: ${course.courseName} (${course.institute})`}
                    //   </Link>
                    // </p>
                    <div key={course.courseId} className="course-item">
                      <p
                        className="course-link"
                        style={{ cursor: 'pointer', marginBottom: '5px' }}
                        onClick={() =>
                          setExpandedCourseName(
                            expandedCourseName === course.courseName ? null : course.courseName
                          )
                        }
                      >
                        {`${course.courseId}: ${course.courseName} (${course.institute})`}
                        {expandedCourseName === course.courseName && (
                          <div className="course-details-inline" style={{ marginLeft: '15px' }}>
                            <button
                              className="syllabus-button"
                              onClick={() => {
                                if (course.syllabusLink) window.open(course.syllabusLink, '_blank');
                                else alert('Syllabus not available');
                              }}
                            >
                              View Syllabus
                            </button>
                            <button
                              className="classroom-button"
                              onClick={() => {
                                const role = localStorage.getItem('role');
                                if (course.classroomLink && (role === 'student' || role === 'admin')) {
                                  window.open(course.classroomLink, '_blank');
                                } else if (!course.classroomLink) {
                                  alert('Classroom link not available.');
                                } else {
                                  alert('You need to login as student or admin to access classroom.');
                                }
                              }}
                            >
                              Go to Classroom
                            </button>
                          </div>
                        )}
                      </p>
                    </div>

                  ))
                ) : (
                  <p>No record found.</p>
                )}
              </Dropdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Courses;
