import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    const location = useLocation();

    if (!token || !allowedRoles.includes(role)) {
        return <Navigate to={`/login?role=${allowedRoles[0]}&redirect=${location.pathname}`} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
