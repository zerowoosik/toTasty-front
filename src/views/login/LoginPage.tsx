'use client';

import { KakaoLoginButton } from '@/features/login-with-kakao';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center flex-col min-h-screen bg-[#FBFBFD] ">
      <div className="flex gap-6 items-center justify-center flex-col w-120 h-50 bg-white shadow-xs rounded-xl">
        <h1 className="text-xl font-semibold">로그인</h1>
        <KakaoLoginButton />
        <p className="text-sm font-medium">
          ToTasty!가 처음이신가요?
          <span className="text-[#7467FF] underline cursor-pointer pl-1">카카오로 회원가입</span>
          {/* 로그인 페이지에서 로고가 생기기 전까지만 추가 */}
        </p>
      </div>
    </main>
  );
}
