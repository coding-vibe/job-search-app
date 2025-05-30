import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_API_HOST}`,
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY || '',
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_API_HOST,
  },
});

export const fetchJobs = async (query: string) => {
  const response = await apiClient.get('/search', {
    params: {
      query,
    },
  });
  return response.data.data;
};

export const fetchJobDetails = async (job_id: string) => {
  const response = await apiClient.get('/job-details', {
    params: {
      job_id,
    },
  });
  return response.data.data[0];
};
