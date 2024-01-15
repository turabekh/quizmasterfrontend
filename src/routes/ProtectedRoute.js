import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, isAuthenticated, redirectPath = '/login' }) => {
    if (!isAuthenticated) {
        // Redirect to the specified path if the user is not authenticated
        return <Navigate to={redirectPath} />;
    }
    
    return children;
}

export default ProtectedRoute;