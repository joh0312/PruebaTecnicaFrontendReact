import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function reservarCita(idCita, idPaciente) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_BASE_URL}/api/citas/reservar`,
      { idCita, idPaciente },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
      }
    );
    return response
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: 'Error de red o inesperado',
      details: error.response.data.message,
    };
  }
}
