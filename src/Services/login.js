import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginService(documento, fechaNacimiento) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      documento,
      fechaNacimiento
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { error: 'Error de red o inesperado', details: error.message };
  }
}

