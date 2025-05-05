import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button, Typography, TablePagination, Skeleton
} from '@mui/material';

const fakeAppointments = [
  { id: 1, date: '2025-05-04', time: '09:00', doctor: 'Dra. Ana Pérez' },
  { id: 2, date: '2025-05-04', time: '10:00', doctor: 'Dr. Juan Gómez' },
  { id: 3, date: '2025-05-04', time: '11:00', doctor: 'Dra. Laura Ruiz' },
  { id: 4, date: '2025-05-04', time: '14:00', doctor: 'Dr. Mario López' },
  { id: 5, date: '2025-05-05', time: '08:30', doctor: 'Dra. Sofía Torres' },
];

const AppointmentSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const specialty = location.state?.specialty;

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (appointment) => {
    navigate('/confirmacion', { state: { appointment, specialty } });
  };

  return (
    <div className="login-wrapper">
      <Typography variant="h5" align="center" gutterBottom sx={{ color: '#444', fontWeight: 700, fontSize: '2.2rem', mb: 1.5 }}>
        Selecciona una cita
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: 480, margin: '0 auto', borderRadius: 16, boxShadow: '0 6px 18px rgba(81,45,168,0.13)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell><b>Fecha</b></TableCell>
              <TableCell><b>Hora</b></TableCell>
              <TableCell><b>Médico</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell padding="checkbox"><Skeleton variant="circular" width={24} height={24} /></TableCell>
                  <TableCell><Skeleton width={60} /></TableCell>
                  <TableCell><Skeleton width={40} /></TableCell>
                  <TableCell><Skeleton width={100} /></TableCell>
                </TableRow>
              ))
            ) : (
              fakeAppointments.map((app) => (
                <TableRow
                  key={app.id}
                  hover
                  selected={selectedAppointment?.id === app.id}
                  onClick={() => setSelectedAppointment(app)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Radio
                      checked={selectedAppointment?.id === app.id}
                      onChange={() => setSelectedAppointment(app)}
                      value={app.id}
                      name="appointment"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>{app.time}</TableCell>
                  <TableCell>{app.doctor}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

      </TableContainer>
      {loading ? (
        <Skeleton variant="rectangular" height={44} style={{ marginTop: 22, borderRadius: 8 }} />
      ) : (
        <button
          className="form-button"
          style={{ marginTop: 22, width: '100%' }}
          disabled={!selectedAppointment}
          onClick={() => selectedAppointment && handleSelect(selectedAppointment)}
        >
          Seleccionar cita
        </button>
      )}
    </div>
  );
};

export default AppointmentSelection;