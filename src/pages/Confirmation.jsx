import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;
  const specialty = location.state?.specialty;
  const paciente = JSON.parse(localStorage.getItem('user'));

  if (!appointment) {
    return <div className="login-wrapper"><h2>No hay cita seleccionada.</h2></div>;
  }

  return (
    <div className="login-wrapper">
      <div className="confirmation-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 650, maxWidth: 900, margin: '0 auto', padding: 0 }}>
        <h2 style={{ width: '100%', textAlign: 'center', marginTop: 32, marginBottom: 32 }}>¡Cita reservada!</h2>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'stretch', gap: 0 }}>
          {/* Columna Paciente */}
          <div style={{ flex: 1, padding: 24 }}>
            <h3 style={{ marginTop: 0, textAlign: 'center' }}>Datos del paciente</h3>
            <p><b>Nombre:</b> {paciente?.nombre} {paciente?.apellidos}</p>
            <p><b>Documento:</b> {paciente?.documento}</p>
            <p><b>Teléfono:</b> {paciente?.telefono}</p>
            <p><b>Fecha de nacimiento:</b> {paciente?.fechaNacimiento ? new Date(paciente.fechaNacimiento).toLocaleDateString() : ''}</p>
          </div>
          {/* Línea divisoria */}
          <div style={{
            width: 2,
            background: 'linear-gradient(to bottom, #f0f0f0, #bbb, #f0f0f0)',
            boxShadow: '0 0 8px 0 #bbb',
            margin: '24px 0'
          }} />
          {/* Columna Cita */}
          <div style={{ flex: 1, padding: 24 }}>
            <h3 style={{ marginTop: 0, textAlign: 'center' }}>Detalles de la cita</h3>
            <p><b>Especialidad:</b> {specialty === 'medicina' ? 'Medicina General' : specialty === 'odontologia' ? 'Examen Odontológico' : specialty}</p>
            <p><b>Fecha:</b> {appointment.date}</p>
            <p><b>Hora:</b> {appointment.time}</p>
            <p><b>Profesional:</b> {appointment.doctor}</p>
          </div>
        </div>
        <div style={{ width: '100%', textAlign: 'center', margin: '32px 0 24px 0' }}>
          <button style={{ marginTop: 0, minWidth: 180 }} onClick={() => navigate('/')}>Reservar otra cita</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
