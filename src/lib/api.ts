import axios from 'axios';
import type { User, LoginCredentials } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const userApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },
  
  create: async (userData: Partial<User>) => {
    try {
      const { data } = await api.post('/users', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        isActive: true
      });
      
      console.log('Respuesta del servidor:', data);
      return data;
    } catch (error: any) {
      console.error('Error completo:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Error al crear usuario');
      }
      throw error;
    }
  },
  
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get('/users');
    return data;
  },
  
  getOne: async (id: number): Promise<User> => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
  
  update: async (id: number, userData: Partial<User>): Promise<User> => {
    const { data } = await api.patch(`/users/${id}`, userData);
    return data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};