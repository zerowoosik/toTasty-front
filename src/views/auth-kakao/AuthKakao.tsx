'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginWithKakaoMutation } from '@/features/login-with-kakao/model/useLoginWithKakaoMutation';

export default function AuthKakao() {
  const searchParams = useSearchParams();
  const kakaoAuthCode = searchParams.get('code');
  const { mutate } = useLoginWithKakaoMutation();
  const router = useRouter();

  useEffect(() => {
    if (kakaoAuthCode === null) return;

    mutate(kakaoAuthCode, {
      onSuccess: () => {
        router.replace('/');
      },
    });
  }, [kakaoAuthCode, mutate, router]);

  return (
    <div>
      <p className="text-center mt-20">카카오 로그인 처리 중...</p>
    </div>
  );
}
