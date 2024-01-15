import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated, redirectPath = '/dashboard' }) => {
  if (isAuthenticated) {
    // Redirect to the specified path if the user is authenticated
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default PublicRoute;
