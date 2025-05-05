import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMedicosPorEspecialidad(especialidad) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/medicos/especialidades/${encodeURIComponent(especialidad)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { error: 'Error de red o inesperado', details: error.message };
  }
}
