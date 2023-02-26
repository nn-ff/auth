import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.userSlice);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
