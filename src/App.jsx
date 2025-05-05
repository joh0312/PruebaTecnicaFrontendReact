import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/Pages.css';
import LoginPage from './pages/LoginPage';
import SpecialtySelection from './pages/SpecialtySelection';
import AppointmentSelection from './pages/AppointmentSelection';
import Confirmation from './pages/Confirmation';

import RouteLoader from './RouteLoader';


function PrivateLoginRoute() {

  const token = localStorage.getItem('token');
  let isValid = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && now < payload.exp) {
        isValid = true;
      }
    } catch (e) {
      isValid = false;
    }
  }
  if (isValid) {
    return <Navigate to="/especialidad" replace />;
  }
  return <LoginPage />;
}


const App = () => {
  return (
    <RouteLoader>
      <Routes>
        <Route path="/" element={<PrivateLoginRoute />} />
        <Route path="/especialidad" element={<SpecialtySelection />} />
        <Route path="/citas" element={<AppointmentSelection />} />
        <Route path="/confirmacion" element={<Confirmation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </RouteLoader>
  );
};

export default App; 