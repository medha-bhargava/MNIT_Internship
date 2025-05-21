import "./Navbar.css"
import logo from './logo.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        navigate("/login");
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
                    <li><Link to="/resources">Resources for Students*</Link></li>
                    <li><Link to="/editProfile">Edit Profile</Link></li>
                    <li><button className="logoutbtn" onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
