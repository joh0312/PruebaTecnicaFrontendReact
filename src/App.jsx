import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/Pages.css';
import LoginPage from './pages/LoginPage';
import SpecialtySelection from './pages/SpecialtySelection';
import AppointmentSelection from './pages/AppointmentSelection';
import Confirmation from './pages/Confirmation';

import RouteLoader from './RouteLoader';

const App = () => {
  return (
    <RouteLoader>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/especialidad" element={<SpecialtySelection />} />
        <Route path="/citas" element={<AppointmentSelection />} />
        <Route path="/confirmacion" element={<Confirmation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </RouteLoader>
  );
};

export default App; 