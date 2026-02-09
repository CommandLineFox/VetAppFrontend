import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {Permission} from "../../types/permissions.types";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredPermission?: Permission;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermission }) => {
    const { token, permissions } = useAuthContext();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace/>;
    }

    if (requiredPermission &&
        !permissions.includes(requiredPermission) &&
        !permissions.includes('ADMIN')) {
        return <Navigate to="/home" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;