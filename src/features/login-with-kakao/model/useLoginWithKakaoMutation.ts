import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user/model/userStore';
import { loginWithKakao } from '../api/loginWithKakao';

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
