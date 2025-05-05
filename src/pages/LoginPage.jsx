import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginService } from '../Services/login';

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
        // Formatear fecha a YYYY-MM-DD
        const fechaNacimiento = birthDate;
        const response = await loginService(documentId, fechaNacimiento);
        // Respuesta esperada
        if (
          response &&
          response.id &&
          response.documento === documentId &&
          response.fechaNacimiento &&
          response.nombre &&
          response.apellidos &&
          response.telefono
        ) {
          navigate('/especialidad');
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
          <h1 className="form-title">Autenticación</h1>
          <input
            type="text"
            className="form-input"
            placeholder="Documento de identidad"
            value={documentId}
            onChange={e => setDocumentId(e.target.value)}
          />
          <input
            type="date"
            className="form-input"
            placeholder="Fecha de nacimiento"
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
