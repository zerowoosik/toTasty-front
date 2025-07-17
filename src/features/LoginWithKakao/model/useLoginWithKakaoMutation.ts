/**
 * ✅ 카카오 로그인 콜백 이후 인가 코드를 이용해 백엔드로 로그인 요청을 보내는 훅
 * 1️⃣ 백엔드에 POST /auth/login 요청 (인가 코드 전달)
 * 2️⃣ 응답으로 받은 유저 정보를 zustand 상태에 저장
 * 3️⃣ 성공 시 메인 페이지로 리다이렉트 (콜백 페이지에서 수행)
 *
 * 사용 위치: /auth/kakao (카카오 로그인 콜백 페이지)
 */

import { useMutation } from '@tanstack/react-query';
import { loginWithKakao } from '@/features/LoginWithKakao/api/loginWithKakao';
import { useUserStore } from '@/entities/user/model/userStore';

export function useLoginWithKakaoMutation() {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginWithKakao,
    onSuccess: (data) => {
      if (!data) return;
      setUser(data);
    },
  });
}
