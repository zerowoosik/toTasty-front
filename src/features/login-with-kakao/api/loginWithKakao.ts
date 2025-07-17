import { postApi } from '@/shared/api/axiosApis';
import { User } from '@/entities/user/model/user';

export async function loginWithKakao(code: string): Promise<User | null> {
  const headers = {
    'Content-Type': 'application/json',
  };

  return postApi<User>('/auth/login', { code }, headers);
}
