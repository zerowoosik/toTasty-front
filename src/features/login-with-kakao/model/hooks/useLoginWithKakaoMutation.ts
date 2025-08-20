import { useMutation } from '@tanstack/react-query';
import { User, useUserStore } from '@/entities/user';
import { loginWithKakao } from '../../api/loginWithKakao';

export function useLoginWithKakaoMutation() {
  const { setLoggedIn, setAccessToken } = useUserStore((state) => state);

  return useMutation({
    mutationFn: loginWithKakao,
    onSuccess: (data) => {
      if (!data) return;
      const { accessToken, ...user } = data;
      setAccessToken(accessToken);
      setLoggedIn(user as unknown as User);
    },
  });
}
