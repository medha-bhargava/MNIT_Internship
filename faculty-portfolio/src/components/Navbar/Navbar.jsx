import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from './logo.png';
import './Navbar.css';

const Navbar = () => {
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    const isStudentOrAdmin = role === "student" || role === "admin";
    const [visibleTabs, setVisibleTabs] = useState({
        home: true,
        publications: true,
        courses: true,
        projects: true,
        events: true,
        gallery: true,
        trips: true,
        students: true,
        resources: true,
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedRole = localStorage.getItem("role");
        setIsLoggedIn(!!storedUserId);
        setRole(storedRole);

        // const fetchVisibleTabs = async () => {
        //     try {
        //         const res = await fetch('http://localhost:8083/api/tab-visibility/all');
        //         const data = await res.json();

        //         if (!Array.isArray(data)) {
        //             console.error("Tab visibility response is not an array:", data);
        //             return;
        //         }

        //         const formatted = {};
        //         data.forEach(item => (formatted[item.fieldName] = item.enabled));
        //         setVisibleTabs(formatted);
        //     } catch (err) {
        //         console.error('Failed to fetch tab visibility:', err);
        //     }
        // };
        const fetchVisibleTabs = async () => {
            try {
                const res = await fetch("http://localhost:8083/api/tab-visibility/all");
                const data = await res.json();
                const formatted = {};
                data.forEach(item => {
                    formatted[item.fieldName] = item.enabled;
                });
                setVisibleTabs(formatted); // now it's an object
            } catch (err) {
                console.error("Failed to fetch tab visibility", err);
            }
        };


        if (storedRole === "student") {
            fetchVisibleTabs();
        }
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

    // const shouldShow = (tabName) => {
    //     return role !== "student" || visibleTabs?.[tabName];
    // };
    // console.log("Role:", role);
    // console.log("Visible Tabs:", visibleTabs);
    const shouldShow = (tabName) => {
        return role !== "student" || visibleTabs?.[tabName.toLowerCase()];
    };

    return (
        <div className="navbar">
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul>
                    {/* <li><Link to="/home">Home</Link></li>
                    <li><Link to="/publications">Publications</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/students">Students</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/trips">Trips & Travels</Link></li> */}

                    {/* Only show after login based on role */}
                    {/* {isLoggedIn && (role === "student" || role === "admin") && (
                        <li><Link to="/resources">Resources</Link></li>
                    )}

                    {isLoggedIn && role === "admin" && (
                        <li><Link to="/editProfile">Edit Profile</Link></li>
                    )} */}

                    {shouldShow("Home") && <li><Link to="/home">Home</Link></li>}
                    {shouldShow("Publications") && <li><Link to="/publications">Publications</Link></li>}
                    {shouldShow("Courses") && <li><Link to="/courses">Courses</Link></li>}
                    {shouldShow("Projects") && <li><Link to="/projects">Projects</Link></li>}
                    {shouldShow("Events") && <li><Link to="/events">Events</Link></li>}
                    {shouldShow("Students") && <li><Link to="/students">Students</Link></li>}
                    {shouldShow("Gallery") && <li><Link to="/gallery">Gallery</Link></li>}
                    {shouldShow("Trips") && <li><Link to="/trips">Trips & Travels</Link></li>}
                    {shouldShow("Resources") && isLoggedIn && isStudentOrAdmin && <li><Link to="/resources">Resources</Link></li>}
                    {isLoggedIn && role === "admin" && <li><Link to="/editProfile">Edit Profile</Link></li>}

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
