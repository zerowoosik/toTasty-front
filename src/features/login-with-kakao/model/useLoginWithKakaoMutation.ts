import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user';
import { loginWithKakao } from '../api/loginWithKakao';

export function useLoginWithKakaoMutation() {
  const { logIn } = useUserStore((state) => state);

  return useMutation({
    mutationFn: loginWithKakao,
    onSuccess: (data) => {
      if (!data) return;
      logIn(data);
    },
  });
}
