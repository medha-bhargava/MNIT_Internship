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
              <Dropdown title="Currently Teaching">
                {currentlyTeaching.length > 0 ? (
                  currentlyTeaching.map(course => (
                    // <p key={course.courseId}>
                    //   {`${course.courseId}: ${course.courseName} (${course.institute})`}
                    // </p>
                    <p key={course.courseId}>
                      <Link to={`/courses/${encodeURIComponent(course.courseName)}`} className="course-link">
                        {`${course.courseId}: ${course.courseName} (${course.institute})`}
                      </Link>
                    </p>
                  ))
                ) : (
                  <p>No courses currently teaching.</p>
                )}
              </Dropdown>
            </div>

            <div className="till_date">
              <Dropdown title="Previously Taught">
                {previouslyTaught.length > 0 ? (
                  previouslyTaught.map(course => (
                    // <p key={course.courseId}>
                    //   {`${course.courseId}: ${course.courseName} (${course.institute})`}
                    // </p>
                    // Remove if not needed
                    <p key={course.courseId}>
                      <Link to={`/courses/${encodeURIComponent(course.courseName)}`} className="course-link">
                        {`${course.courseId}: ${course.courseName} (${course.institute})`}
                      </Link>
                    </p>
                  ))
                ) : (
                  <p>No previously taught courses.</p>
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
