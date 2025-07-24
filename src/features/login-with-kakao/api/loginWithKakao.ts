import { getApi } from '@/shared/api/axiosApis';
import { LoginResponse } from './types';

export async function loginWithKakao(code: string): Promise<LoginResponse | null> {
  const headers = {
    'Content-Type': 'application/json',
  };

  return getApi<LoginResponse>(
    process.env.NEXT_PUBLIC_KAKAO_LOGIN_URI!.toString(),
    { code },
    headers,
  );
}

//TEST
