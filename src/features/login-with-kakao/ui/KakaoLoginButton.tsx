'use client';

import { Button } from '@/shared/ui/Button';
import Image from 'next/image';

function kakaoRedirect() {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
}
export default function KakaoLoginButton() {
  return (
    <Button onClick={kakaoRedirect} className="w-90" variant="login" size="lg">
      <Image src="/assets/icons/kakao-icon.svg" width={20} height={20} alt="카카오톡" />
      카카오톡으로 로그인하기
    </Button>
  );
}
