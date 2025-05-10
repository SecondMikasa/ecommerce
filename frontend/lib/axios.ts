// src/lib/axios.ts (or similar path in your Next.js app)
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
})

export default apiClient