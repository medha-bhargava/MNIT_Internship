import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from './logo.png';
import './Navbar.css';

const Navbar = () => {
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedRole = localStorage.getItem("role");
        setIsLoggedIn(!!storedUserId);
        setRole(storedRole);
    }, []);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            localStorage.removeItem("userName");
            setIsLoggedIn(false);
            setRole(null);
            navigate("/");
            setIsLoggingOut(false);
        }, 1000);
    };

    return (
        <div className="navbar">
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/publications">Publications</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/phd">PhD Supervised</Link></li>

                    {/* Only show after login based on role */}
                    {isLoggedIn && (role === "student" || role === "admin") && (
                        <li><Link to="/resources">Resources for Students*</Link></li>
                    )}

                    {isLoggedIn && role === "admin" && (
                        <li><Link to="/editProfile">Edit Profile</Link></li>
                    )}

                    {/* Show login if not logged in */}
                    {!isLoggedIn && (
                        <li>
                            <button className="logoutbtn" onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </li>
                    )}

                    {/* Show logout if logged in */}
                    {isLoggedIn && (
                        <li>
                            <button className="logoutbtn" onClick={handleLogout} disabled={isLoggingOut}>
                                {isLoggingOut ? <div className="spinner"></div> : "Logout"}
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
