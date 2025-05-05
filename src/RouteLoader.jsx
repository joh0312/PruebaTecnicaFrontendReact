import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const RouteLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 900); // Duración de la pantalla de carga
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.82)',
        zIndex: 9999,
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress size={60} thickness={4} style={{ color: '#6a41d1' }} />
      </div>
    );
  }

  return children;
};

export default RouteLoader;
