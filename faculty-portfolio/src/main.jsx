import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './components/Login/Login.jsx';
import HomePage from './components/Home/Home.jsx'
import PublicationPage from './components/Publications/Publications.jsx'
import AddPublication from './components/Publications/AddPublication.jsx';
import CoursesPage from './components/Courses/Courses.jsx'
import AddCourse from './components/Courses/AddCourse.jsx';
import Resources from './components/Resources/Resources.jsx'
import EditProfile from './components/EditProfile/EditProfile.jsx'
import AccessDenied from "./components/AccessDenied/AccessDenied.jsx";

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/publications" element={<PublicationPage />} />
        <Route path="/add-publication" element={<AddPublication />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/add-course" element={<AddCourse/>} />

        {/* ✅ Protected: only student and admin */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <Resources />
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
    </BrowserRouter>
  </StrictMode>,
);
