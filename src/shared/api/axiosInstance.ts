import axios, { AxiosInstance } from 'axios';

export default function axiosInstance(apiUrl: string | undefined): AxiosInstance {
  if (apiUrl === undefined) {
    throw new Error('API URL not exist');
  }

  return axios.create({
    baseURL: apiUrl,
  });
}
