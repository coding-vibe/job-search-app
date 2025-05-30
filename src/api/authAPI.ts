import axios from 'axios';

const authAPIClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

export default authAPIClient;
