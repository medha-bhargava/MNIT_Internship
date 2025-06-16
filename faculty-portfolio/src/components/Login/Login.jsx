import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const [role, setRole] = useState("student");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect");
    const roleFromURL = searchParams.get("role");

    useEffect(() => {
        if (roleFromURL) {
            setRole(roleFromURL);
        }
    }, [roleFromURL]);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        setError("");

        try {
            console.log("Sending to backend:", {
                userId,
                password,
                role,
            });
            const response = await fetch("https://faculty-backend-koz0.onrender.com/api/auth/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                credentials: "include",
                body: JSON.stringify({
                    userId,
                    password,
                    role
                })
            });

            if (!response.ok) {
                throw new Error("Invalid User ID, Password or Role");
            }

            const data = await response.json();
            localStorage.setItem("role", role);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("userId", userId);
            setIsLoggingIn(false);
            navigate(redirectPath || "/home");
        } catch (err) {
            setIsLoggingIn(false);
            setError(err.message);
        }
    };


    return (
        <div className="loginBox">
            <div className="login">
                <h1>Login</h1>
            </div>

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!!roleFromURL} // Disable dropdown if role is preselected
            >
                <option value="student">Login as Student</option>
                <option value="admin">Login as Admin</option>
            </select>

            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button" onClick={handleLogin} disabled={isLoggingIn}>
                {isLoggingIn ? <div className="spinner"></div> : "Login"}
            </button>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
