'use client';

import { Button } from '@/shared/ui/Button';
import Image from 'next/image';

export default function SocialLoginButton() {
  const clientKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const handleLogin = () => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?' +
      `client_id=${clientKey}` +
      `&redirect_uri=${redirectUri}` +
      '&response_type=code';
  };
  return (
    <Button onClick={handleLogin} className="w-90" variant="login" size="lg">
      <Image src="/assets/icons/kakao-icon.svg" width={20} height={20} alt="카카오톡" />
      카카오톡으로 로그인하기
    </Button>
  );
}
