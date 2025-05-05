import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const showLogout = location.pathname !== '/login' && location.pathname !== '/';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {showLogout && (
        <div style={{ position: 'fixed', right: 18, top: 18, zIndex: 1000 }}>
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '7px 18px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(239,68,68,0.08)',
              transition: 'background 0.2s',
              letterSpacing: 1
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#dc2626')}
            onMouseOut={e => (e.currentTarget.style.background = '#ef4444')}
          >
            Cerrar sesión
          </button>
        </div>
      )}
      <RouteLoader>
        <Routes>
          <Route path="/" element={<PrivateLoginRoute />} />
          <Route path="/especialidad" element={<SpecialtySelection />} />
          <Route path="/citas" element={<AppointmentSelection />} />
          <Route path="/confirmacion" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </RouteLoader>
    </>
  );
};

export default App; 