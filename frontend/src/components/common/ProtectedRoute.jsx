import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import UnauthorizedPage from "../../pages/UnauthorizedPage";

function ProtectedRoute({ children, redirect = true }) {
    const { isAdmin } = useRole();

    if (!isAdmin) {
        if (redirect) {
            return <Navigate to="/" replace />;
        }
        return <UnauthorizedPage />;
    }

    return children;
}

export default ProtectedRoute;
