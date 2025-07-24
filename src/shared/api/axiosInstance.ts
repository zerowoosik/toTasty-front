import axios, { AxiosInstance } from 'axios';
import { useUserStore, User } from '@/entities/user/index';

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
      if (error.response?.status === 401 && !error.config.isRetried) {
        const originRequest = { ...error.config, isRetried: true };

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
            originRequest.headers.Authorization = `Bearer ${accessToken}`;
            return await axios(originRequest);
          }
        } catch (axiosError) {
          useUserStore.getState().clearAccessToken();
          useUserStore.getState().logOut();
          return Promise.reject(axiosError);
          // TODO logout 관련 로직 추가 작성
        }
      }

      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use((config) => {
    const { accessToken } = useUserStore.getState();
    const origin = { ...config };

    if (accessToken) {
      origin.headers.Authorization = `Bearer ${accessToken}`;
    }
    return origin;
  });

  instances.set(apiUrl, instance);

  return instance;
}
