// 이 함수는 카카오 로그인 API를 호출하여 유저 정보를 받아오는 역할을 합니다.
// code는 카카오 로그인 후 받은 인가 코드이며, 이를 서버로 전송하여 유저 정보를 받아옵니다.
// 반환값은 User 타입의 객체이며, 로그인에 성공하면 유저 정보를 포함하고, 실패하면 null을 반환합니다.

import { postApi } from '@/shared/api/axiosApis';
import { User } from '@/entities/user/model/user';

export async function loginWithKakao(code: string): Promise<User | null> {
  const headers = {
    'Content-Type': 'application/json',
  };

  return postApi<User>('/auth/login', { code }, headers);
}
