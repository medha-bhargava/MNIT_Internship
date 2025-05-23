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
        const token = localStorage.getItem("authToken");
        const storedRole = localStorage.getItem("role");
        setIsLoggedIn(!!token);
        setRole(storedRole);
    }, []);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("role");
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

                    {/* Student and Admin can see Resources */}
                    {(role === "student" || role === "admin") && isLoggedIn && (
                        <li><Link to="/resources">Resources for Students*</Link></li>
                    )}

                    {/* Only admin can see Edit Profile */}
                    {role === "admin" && isLoggedIn && (
                        <li><Link to="/editProfile">Edit Profile</Link></li>
                    )}

                    {/* Login options only when not logged in */}
                    {!isLoggedIn && (
                        <>
                            <li><Link to="/login?role=student&redirect=/resources">Resources for Students*</Link></li>
                            <li><Link to="/login?role=admin&redirect=/editProfile">Edit Profile</Link></li>
                        </>
                    )}

                    {/* Logout button if logged in */}
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
