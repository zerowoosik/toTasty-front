import { getApi } from '@/shared/api/axiosApis';
import { User } from '@/entities/user/model/user';

export async function loginWithKakao(code: string): Promise<User | null> {
  const headers = {
    'Content-Type': 'application/json',
  };

  return getApi<User>('/auth/login', { code }, headers);
}
// TODO: POST인줄 알았는데 GET이였고 여기서 동작하는지 확인하고 확인되면 그때 entities로 이동시킬 예정
