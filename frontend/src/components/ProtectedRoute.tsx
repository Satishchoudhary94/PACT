import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const isLoggedIn = localStorage.getItem('isAdmin') !== null;
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isLoggedIn) {
    // Redirect to appropriate login page based on adminOnly flag
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
  }

  if (adminOnly && !isAdmin) {
    // Redirect non-admin users trying to access admin routes
    return <Navigate to="/" replace />;
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute; 