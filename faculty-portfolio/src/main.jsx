import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './components/Login/Login.jsx';
import HomePage from './components/Home/Home.jsx'
import PublicationPage from './components/Publications/Publications.jsx'
import AddPublication from './components/Publications/AddPublication.jsx';
import CoursesPage from './components/Courses/Courses.jsx'
import AddCourse from './components/Courses/AddCourse.jsx';
import Resources from './components/Resources/Resources.jsx';
import AddResource from './components/Resources/AddResource.jsx';
import Projects from "./components/Projects/Projects.jsx";
import AddProjects from "./components/Projects/AddProject.jsx";
import Events from './components/Events/Events.jsx';
import Students from "./components/Students/Students.jsx";
import EditProfile from './components/EditProfile/EditProfile.jsx';
import AccessDenied from "./components/AccessDenied/AccessDenied.jsx";
// import CourseDetails from './components/Courses/CourseDetails.jsx';
import SyllabusView from './components/Courses/SyllabusView';
import AddLecturePlan from './components/Courses/AddLecturePlan.jsx';
import Gallery from './components/Gallery/Gallery';
import AddTrip from './components/Trips/AddTrip';
import Trips from './components/Trips/Trips';

import './index.css'

// 💡 Component to handle redirect from 404.html
function RedirectHandler({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect);
    }
  }, [navigate]);

  return children;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/MNIT_Internship">
      <RedirectHandler>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/publications" element={<PublicationPage />} />
          <Route path="/add-publication" element={<AddPublication />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/add-course" element={<AddCourse />} />
          {/* <Route path="/courses/:courseName" element={<CourseDetails />} /> */}
          <Route path="/syllabus/:courseId/:year" element={<SyllabusView />} />
          <Route path="/add-lecture-plan" element={<AddLecturePlan />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/add-projects" element={<AddProjects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/students" element={<Students />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/add-trip" element={<AddTrip />} />


          {/* ✅ Protected: only student and admin */}
          <Route
            path="/resources"
            element={
              <ProtectedRoute allowedRoles={["student", "admin"]}>
                <Resources />
              </ProtectedRoute>
            }
          />

          {/* Add this new route below for AddResource, admin only */}
          <Route
            path="/add-resource"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddResource />
              </ProtectedRoute>
            }
          />

          {/* ✅ Protected: only admin */}
          <Route
            path="/editProfile"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </RedirectHandler>
    </BrowserRouter>
  </StrictMode>,
);
