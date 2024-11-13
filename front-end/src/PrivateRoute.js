import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // Verifica se o token está armazenado
  
  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
