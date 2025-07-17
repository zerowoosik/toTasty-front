import { useMutation } from '@tanstack/react-query';
import { loginWithKakao } from '@/features/login-with-kakao/api/loginWithKakao';
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
