'use client';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import { useLoginWithKakao } from '../model/useLoginWithKakao';

export default function SocialLoginButton() {
  const { handleLogin } = useLoginWithKakao();

  return (
    <Button onClick={handleLogin} className="w-90" variant="login" size="lg">
      <Image src="/assets/icons/kakao-icon.svg" width={20} height={20} alt="카카오톡" />
      카카오톡으로 로그인하기
    </Button>
  );
}
