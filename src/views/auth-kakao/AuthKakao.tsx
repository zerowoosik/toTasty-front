'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginWithKakaoMutation } from '@/features/login-with-kakao/model/useLoginWithKakaoMutation';

export default function AuthKakao() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { mutate } = useLoginWithKakaoMutation();
  const router = useRouter();

  useEffect(() => {
    if (code === null) {
      console.log('카카오 인가 코드 없음');
      return;
    }

    console.log('API 요청 시작');
    mutate(code, {
      onSuccess: () => {
        console.log('API 요청 성공');
        router.replace('/');
      },
    });
  }, [code, mutate, router]);

  return (
    <div>
      <p className="text-center mt-20">카카오 로그인 처리 중...</p>
    </div>
  );
}
