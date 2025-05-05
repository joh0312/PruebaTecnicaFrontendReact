import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function reservarCita(idCita, idPaciente) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/citas/reservar`, {
      idCita,
      idPaciente
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { error: 'Error de red o inesperado', details: error.message };
  }
}
