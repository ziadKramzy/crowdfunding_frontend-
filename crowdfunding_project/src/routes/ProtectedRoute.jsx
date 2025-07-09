import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = (props) => {
  const location = useLocation();
  if (localStorage.getItem('userToken') !== null) {
    return props.children;
  } else {
    if (location.pathname === '/campaigns' || location.pathname === '/') {
      return props.children;
    }
    return <Navigate to={'/login'} />;
  }
}
