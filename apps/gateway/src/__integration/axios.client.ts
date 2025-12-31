import axios from 'axios';

export const authServiceClient = axios.create({
  baseURL: 'http://localhost:3001/auth',
});
