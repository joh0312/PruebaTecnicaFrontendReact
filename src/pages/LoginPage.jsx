import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginService } from '../Services/login';
import { getPaciente } from '../Services/paciente';

const LoginPage = () => {
  const [documentId, setDocumentId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (documentId.trim() && birthDate.trim()) {
      try {
        const fechaNacimiento = birthDate;
        const response = await loginService(documentId, fechaNacimiento);
        if (response && response.token && response.documento) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('documento', response.documento);
          const paciente = await getPaciente(response.documento, response.token);
          if (paciente) {
            localStorage.setItem('user', JSON.stringify(paciente));
            navigate('/especialidad');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'No se encontró paciente',
              text: typeof paciente === 'object' ? JSON.stringify(paciente) : String(paciente),
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login incorrecto',
            text: typeof response === 'object' ? JSON.stringify(response) : String(response),
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: err.message,
        });
      }
    } else {
      setError('Completa todos los campos.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="card" style={{maxWidth: 410, width: '100%'}}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="form-title" style={{ marginBottom: 28 }}>Autenticación</h1>
          <label htmlFor="documentId" style={{ display: 'block', marginBottom: 4, marginTop: 0, color: '#444', fontWeight: 500 }}>
            Documento de identidad
          </label>
          <input
            id="documentId"
            type="text"
            className="form-input"
            value={documentId}
            onChange={e => setDocumentId(e.target.value)}
          />
          <label htmlFor="birthDate" style={{ display: 'block', marginBottom: 4, marginTop: 14, color: '#444', fontWeight: 500 }}>
            Fecha de nacimiento
          </label>
          <input
            id="birthDate"
            type="date"
            className="form-input"
            placeholder="Fecha de nacimiento (nacimiento)"
            aria-label="Fecha de nacimiento"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
          {error && <div className="form-error">{error}</div>}
          <button className="form-button" type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
