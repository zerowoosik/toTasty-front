'use client';

import { Button } from '@/shared/ui/Button';
import Image from 'next/image';
import { kakaoLogin } from '../model/kakaoLogin';

export default function SocialLoginButton() {
  return (
    <Button onClick={kakaoLogin} className="w-90" variant="login" size="lg">
      <Image src="/assets/icons/kakao-icon.svg" width={20} height={20} alt="카카오톡" />
      카카오톡으로 로그인하기
    </Button>
  );
}
