import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPaciente(documento) {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/pacientes/${documento}`,
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
