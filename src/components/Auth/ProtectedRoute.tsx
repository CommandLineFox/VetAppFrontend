import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {Permission} from "../../constants/permissions.constants";
import {useAuthContext} from "../../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredPermission?: Permission;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermission }) => {
    const { token, permissions } = useAuthContext();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    if (requiredPermission &&
        !permissions.includes(requiredPermission) &&
        !permissions.includes('ADMIN')) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;