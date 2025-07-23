import axios, { AxiosInstance } from 'axios';
import { useUserStore } from '@/entities/user/index';
import { User } from '@/entities/user/index';

const instances = new Map<string, AxiosInstance>();

interface ReissueResponse {
  accessToken: string;
  user: User;
}

export default function axiosInstance(apiUrl: string | undefined): AxiosInstance {
  if (apiUrl === undefined) {
    throw new Error('API URL not exist');
  }

  if (instances.has(apiUrl)) {
    return instances.get(apiUrl)!;
  }

  const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;

        const reissueInstance: AxiosInstance = instances.has(apiUrl)
          ? instances.get(apiUrl)!
          : axios.create({ baseURL: apiUrl, withCredentials: true });

        try {
          const response = await reissueInstance.post<ReissueResponse>(
            '/api/v1/auth/token/reissue',
          );

          if (response.status === 200) {
            const { accessToken } = response.data;
            useUserStore.getState().setAccessToken(accessToken);
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            console.log('response intercepter');
            return axios(error.config);
          }
        } catch (axiosError) {
          useUserStore.getState().clearAccessToken();
          useUserStore.getState().logOut();
          //TODO logout 관련 로직 추가 작성
        }
      }
    },
  );

  instance.interceptors.request.use((config) => {
    console.log('request intercepter');
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instances.set(apiUrl, instance);

  return instance;
}
