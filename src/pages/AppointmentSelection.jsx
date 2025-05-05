import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Typography, Skeleton
} from '@mui/material';
import { getMedicosPorEspecialidad } from '../Services/medicos';
import { getCitasDisponibles } from '../Services/citas';
import Swal from 'sweetalert2';
import { reservarCita } from '../Services/reservarCita';

const AppointmentSelection = () => {
  const [backHover, setBackHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const specialty = location.state?.specialty;

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
                let specialtyName = '';
        if (specialty === 'medicina') specialtyName = 'Medicina general';
        else if (specialty === 'odontologia') specialtyName = 'Examen odontológico';
        else specialtyName = specialty;
        const medicos = await getMedicosPorEspecialidad(specialtyName);
        if (!Array.isArray(medicos)) throw new Error('Error al obtener médicos');
        const citas = await getCitasDisponibles();
        if (!Array.isArray(citas)) throw new Error('Error al obtener citas');
        const citasFiltradas = citas.filter(cita => cita.especialidad === specialtyName);
        const citasConMedico = citasFiltradas.map(cita => {
          const medico = medicos.find(m => m.id === cita.idMedico);
          return {
            id: cita.id,
            date: cita.fechaHora.split('T')[0],
            time: cita.fechaHora.split('T')[1]?.substring(0,5),
            doctor: medico ? medico.nombre : 'Desconocido',
            raw: cita
          };
        });
        setAppointments(citasConMedico);
      } catch (err) {
        setError(err.message || 'Error al cargar citas');
      }
      setLoading(false);
    };
    fetchData();

  }, [specialty]);

  const handleReserve = async () => {
    debugger
    if (!selectedAppointment) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe seleccionar una cita primero.'
      });
      return;
    }
    const citaInfo = `¿Desea reservar una cita con el médico <b>${selectedAppointment.doctor}</b> a la hora <b>${selectedAppointment.time}</b> con la fecha <b>${new Date(selectedAppointment.date).toLocaleDateString()}</b>?`;
    const result = await Swal.fire({
      icon: 'question',
      title: '¿Confirmar reserva de cita?',
      html: citaInfo,
      showCancelButton: true,
      confirmButtonText: 'Sí, reservar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      const paciente = JSON.parse(localStorage.getItem('user'));
      if (!paciente || !paciente.id) {U
        Swal.fire({ icon: 'error', title: 'No se encontró paciente en sesión.' });
        return;
      }
      const reserva = await reservarCita(selectedAppointment.id, paciente.id);
      console.log(reserva)
      if (reserva.status) {
        Swal.fire({ icon: 'success', title: 'Cita reservada con éxito' }).then(() => {
          navigate('/confirmacion', { state: { appointment: selectedAppointment, specialty } });
        });
      } else {
        Swal.fire({ icon: 'error', title: 'Error al reservar', text: reserva.details });
      }
    }
  };



  return (
    <div className="login-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 700,
        background: 'transparent',
        borderRadius: 0,
        boxShadow: 'none',
        padding: 36,
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#f3f4f6',
          borderRadius: 16,
          padding: '12px 20px 12px 12px',
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(99,102,241,0.07)'
        }}>
          <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setBackHover(true)}
            onMouseLeave={() => setBackHover(false)}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: backHover ? '#818cf8' : '#6366f1',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              marginRight: 18,
              boxShadow: '0 1px 4px rgba(99,102,241,0.13)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            aria-label="Volver"
          >
          <span style={{ display: 'inline-block', transform: 'translate(-1px, -2px)' }}>←</span>
          
          </button>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: '#3b3b3b', fontWeight: 700, fontSize: '2.2rem', mb: 0 }}>
            Selecciona una cita
          </Typography>
        </div>
        <TableContainer component={Paper} style={{ width: '100%', borderRadius: 16, boxShadow: '0 6px 18px rgba(81,45,168,0.13)', marginBottom: 18 }}>
          <Table size="medium">
            <TableHead>
              <TableRow style={{ background: '#f3f4f6' }}>
                <TableCell padding="checkbox"></TableCell>
                <TableCell style={{ fontWeight: 700, color: '#4f46e5' }}>Fecha</TableCell>
                <TableCell style={{ fontWeight: 700, color: '#4f46e5' }}>Hora</TableCell>
                <TableCell style={{ fontWeight: 700, color: '#4f46e5' }}>Médico</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell padding="checkbox"><Skeleton variant="circular" width={28} height={28} /></TableCell>
                    <TableCell><Skeleton width={80} /></TableCell>
                    <TableCell><Skeleton width={50} /></TableCell>
                    <TableCell><Skeleton width={120} /></TableCell>
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" style={{ color: 'red', fontWeight: 600 }}>{error}</TableCell>
                </TableRow>
              ) : appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">No hay citas disponibles.</TableCell>
                </TableRow>
              ) : (
                appointments.map((app) => (
                  <TableRow
                    key={app.id}
                    hover
                    selected={selectedAppointment?.id === app.id}
                    onClick={() => setSelectedAppointment(app)}
                    style={{ cursor: 'pointer', background: selectedAppointment?.id === app.id ? '#e0e7ef' : 'transparent', transition: 'background 0.2s' }}
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedAppointment?.id === app.id}
                        onChange={() => setSelectedAppointment(app)}
                        value={app.id}
                        name="appointment"
                        color="primary"
                        sx={{ transform: 'scale(1.3)' }}
                      />
                    </TableCell>
                    <TableCell style={{ fontSize: 17 }}>{app.date}</TableCell>
                    <TableCell style={{ fontSize: 17 }}>{app.time}</TableCell>
                    <TableCell style={{ fontSize: 17 }}>{app.doctor}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {loading ? (
          <Skeleton variant="rectangular" height={44} style={{ marginTop: 22, borderRadius: 8, width: '100%' }} />
        ) : (
          <button
            className="form-button"
            style={{
              marginTop: 12,
              width: '100%',
              padding: '14px 0',
              fontWeight: 700,
              fontSize: 18,
              background: 'linear-gradient(90deg,#6366f1 0%,#818cf8 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              boxShadow: '0 2px 8px rgba(99,102,241,0.09)',
              transition: 'background 0.2s',
              cursor: 'pointer',
              letterSpacing: 1
            }}
            onClick={handleReserve}
          >
            Seleccionar cita
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentSelection;