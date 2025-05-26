import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    // const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    // if (!token) {
    //     return <Navigate to="/login" replace />;
    // }
    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    // if (!allowedRoles.includes(role)) {
    //     if (!allowedRoles.includes(role)) {
    //         return <Navigate to="/access-denied" replace />;
    //     }
    // }
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
};

export default ProtectedRoute;
