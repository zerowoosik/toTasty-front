import AuthKakao from '@/views/auth-kakao/AuthKakao';
import { Suspense } from 'react';

export default function KakaoCallbackPage() {
  <Suspense fallback={<div>Loading...</div>}>
    return <AuthKakao />;
  </Suspense>;
}
