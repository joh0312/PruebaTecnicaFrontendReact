import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const specialties = [
  {
    key: 'medicina',
    name: 'Medicina General',
    description: 'Consulta médica general para valoración y diagnóstico.',
    icon: '🩺',
  },
  {
    key: 'odontologia',
    name: 'Examen Odontológico',
    description: 'Revisión dental y de salud bucal.',
    icon: '🦷',
  },
];

const SpecialtySelection = () => {
  const navigate = useNavigate();

  const handleSelect = (specialty) => {
    navigate('/citas', { state: { specialty } });
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const nombreCompleto = user ? `${user.nombre} ${user.apellidos}` : '';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const location = useLocation();

  const showLogout = location.pathname !== '/login';

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
      <div className="login-wrapper">

      <h2 style={{textAlign:'center', color:'#444', marginBottom: 12}}>
        {nombreCompleto && `¡Bienvenido, ${nombreCompleto}!`}
      </h2>
      <h1 style={{textAlign:'center', color:'#444'}}>Selecciona la especialidad</h1>
      <div className="card-grid">
        {specialties.map(spec => (
          <div key={spec.key} className="card" onClick={() => handleSelect(spec.key)}>
            <div className="card-icon">{spec.icon}</div>
            <div className="card-title">{spec.name}</div>
            <div className="card-desc">{spec.description}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default SpecialtySelection;
