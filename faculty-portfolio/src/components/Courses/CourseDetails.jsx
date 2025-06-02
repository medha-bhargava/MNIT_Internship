import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetails.css';

function CourseDetails() {
  const { courseName } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:8083/api/courses/name/${encodeURIComponent(courseName)}`);
        const data = await res.json();
        if (res.ok) {
          setCourse(data);
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseName]);

  const handleClassroomClick = () => {
    const role = localStorage.getItem('role');
    if (!course.classroomLink) {
      alert('Classroom link is not available.');
      return;
    }
    if (role === 'student' || role === 'admin') {
      window.open(course.classroomLink, '_blank');
    } else {
      navigate('/login');
    }
  };

  const handleSyllabusClick = () => {
    if (course.syllabusLink) {
      window.open(course.syllabusLink, '_blank');
    } else {
      alert('Syllabus link not available.');
    }
  }

  if (loading) return <p className="para">Loading...</p>;
  if (!course) return <p className="para">Course Details not found.</p>;

  return (
    <div className="course-details">
      <h2>{course.courseId}: {course.courseName}</h2>
      <p><strong>Institute:</strong> {course.institute}</p>
      <p><strong>Type:</strong> {course.courseType}</p>

      <p>
        <strong>Syllabus:</strong>{' '}
        {/* <a href={course.syllabusLink} target="_blank" rel="noreferrer">
          View Syllabus
        </a> */}
        <button onClick={handleSyllabusClick} className="syllabus-button">
          View Syllabus
        </button>
      </p>

      <p>
        <strong>Classroom:</strong>{' '}
        <button onClick={handleClassroomClick} className="classroom-button">
          Go to Classroom
        </button>
      </p>
    </div>
  );
}

export default CourseDetails;
