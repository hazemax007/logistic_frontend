// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, currentUser, ...rest }) => {
  return (
    <Route
      {...rest}
      element={currentUser ? Element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
