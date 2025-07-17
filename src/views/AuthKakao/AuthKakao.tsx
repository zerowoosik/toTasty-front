'use client';

/**
 * ✅ 카카오 로그인 성공 후 돌아오는 콜백 페이지
 * 1️⃣ URL에 있는 인가 코드(code)를 읽어옴
 * 2️⃣ useLoginWithKakaoMutation()을 통해 로그인 API 호출
 * 3️⃣ 성공하면 zustand에 저장된 상태로 메인 페이지 이동
 */

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginWithKakaoMutation } from '@/features/LoginWithKakao/model/useLoginWithKakaoMutation';

export default function AuthKakao() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { mutate } = useLoginWithKakaoMutation();
  const router = useRouter();

  useEffect(() => {
    if (!code) return;
    console.log('API 요청 시작');
    mutate(code, {
      onSuccess: () => {
        console.log('API 요청 성공');
        router.replace('/');
      },
    });
  }, [code, mutate, router]);
  console.log('카카오 로그인 콜백 페이지, 인가 코드:', code);

  return (
    <div>
      <p className="text-center mt-20">카카오 로그인 처리 중...</p>
    </div>
  );
}
