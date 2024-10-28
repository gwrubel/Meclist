import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './pages/Login/LoginScreen';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginScreen />
  </React.StrictMode>
);