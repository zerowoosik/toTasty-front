import { getApi } from '@/shared/api/axiosApis';

export default async function logout(): Promise<object | null> {
  return getApi(`/api/v1/auth/logout`);
}
