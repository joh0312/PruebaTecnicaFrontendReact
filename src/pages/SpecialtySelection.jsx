import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Obtener usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const nombreCompleto = user ? `${user.nombre} ${user.apellidos}` : '';

  return (
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
  );
};

export default SpecialtySelection;
