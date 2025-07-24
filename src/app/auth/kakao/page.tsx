import AuthKakao from '@/views/auth-kakao/AuthKakao';
import { Suspense } from 'react';

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthKakao />
    </Suspense>
  );
}
