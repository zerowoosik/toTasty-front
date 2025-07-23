'use client';

import { Button } from '@/shared/ui/Button';
import Image from 'next/image';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
function kakaoRedirect() {
  window.location.href = `${apiUrl}/api/v1/auth/login/redirect`;
}
export default function KakaoLoginButton() {
  return (
    <Button onClick={kakaoRedirect} className="w-90" variant="login" size="lg">
      <Image src="/assets/icons/kakao-icon.svg" width={20} height={20} alt="카카오톡" />
      카카오톡으로 로그인하기
    </Button>
  );
}
