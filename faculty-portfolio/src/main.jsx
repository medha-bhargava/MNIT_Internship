import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './components/Login/Login.jsx';
import HomePage from './components/Home/Home.jsx'
import PublicationPage from './components/Publications/Publications.jsx'
import CoursesPage from './components/Courses/Courses.jsx'
import Resources from './components/Resources/Resources.jsx'
import EditProfile from './components/EditProfile/EditProfile.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/publications" element={<PublicationPage />} />
        <Route path="/courses" element={<CoursesPage />} />

        {/* Protected Resources Route for student and admin */}
        <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
          <Route path="/resources" element={<Resources />} />
        </Route>

        {/* Protected Edit Profile for admin only */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/editProfile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
