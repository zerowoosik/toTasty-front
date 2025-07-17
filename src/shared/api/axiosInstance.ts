import axios, { AxiosInstance } from 'axios';

const instances = new Map<string, AxiosInstance>();

export default function axiosInstance(apiUrl: string | undefined): AxiosInstance {
  if (apiUrl === undefined) {
    throw new Error('API URL not exist');
  }

  if (instances.has(apiUrl)) {
    return instances.get(apiUrl)!;
  }

  return axios.create({
    baseURL: apiUrl,
  });
}
