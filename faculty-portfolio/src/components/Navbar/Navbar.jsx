import "./Navbar.css"
import logo from './logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();

    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        const token = localStorage.getItem("authToken");
        setRole(storedRole);
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className="navbar">
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul>
                    {/* Only show all links if admin and logged in */}
                    {role === "admin" && isLoggedIn && (
                        <>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/publications">Publications</Link></li>
                            <li><Link to="/courses">Courses</Link></li>
                            <li><Link to="/resources">Resources for Students*</Link></li>
                            <li><Link to="/editProfile">Edit Profile</Link></li>
                        </>
                    )}

                    {/* Only show resources if student is logged in */}
                    {role === "student" && isLoggedIn && (
                        <>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/publications">Publications</Link></li>
                            <li><Link to="/courses">Courses</Link></li>
                            <li><Link to="/resources">Resources for Students*</Link></li>
                        </>
                    )}

                    {/* Always show logout if logged in */}
                    {isLoggedIn && (
                        <li><button className="logoutbtn" onClick={handleLogout}>Logout</button></li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
