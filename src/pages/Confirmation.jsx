import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;
  const specialty = location.state?.specialty;

  if (!appointment) {
    return <div className="login-wrapper"><h2>No hay cita seleccionada.</h2></div>;
  }

  return (
    <div className="login-wrapper">
      <div className="confirmation-card">
        <h2>¡Cita reservada!</h2>
        <p><b>Especialidad:</b> {specialty === 'medicina' ? 'Medicina General' : 'Examen Odontológico'}</p>
        <p><b>Fecha:</b> {appointment.date}</p>
        <p><b>Hora:</b> {appointment.time}</p>
        <p><b>Profesional:</b> {appointment.doctor}</p>
        <button onClick={() => navigate('/')}>Reservar otra cita</button>
      </div>
    </div>
  );
};

export default Confirmation;
