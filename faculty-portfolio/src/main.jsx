import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import StudentLogin from './components/Login/StudentLogin.jsx'
import AdminLogin from './components/Login/AdminLogin.jsx'
import HomePage from './components/Home/Home.jsx'
import PublicationPage from './components/Publications/Publications.jsx'
import CoursesPage from './components/Courses/Courses.jsx'
import Resources from './components/Resources/Resources.jsx'
import EditProfile from './components/EditProfile/EditProfile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<App />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/publications" element={<PublicationPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
