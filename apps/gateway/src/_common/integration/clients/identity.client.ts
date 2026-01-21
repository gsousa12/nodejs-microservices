import axios from 'axios';

export const identityClient = axios.create({
  baseURL: 'http://localhost:3001/v1/identity',
});
