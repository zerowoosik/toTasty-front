'use client';

import SocialLoginButton from '@/features/login-with-kakao/ui/KakaoLoginButton';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center flex-col min-h-screen bg-[#FBFBFD] ">
      <div className="flex gap-6 items-center justify-center flex-col w-120 h-50 bg-white shadow-xs rounded-xl">
        <h1 className="text-xl font-semibold">로그인</h1>
        <SocialLoginButton />
        <p className="text-sm font-medium">
          ToTasty!가 처음이신가요?
          <a className="text-[#7467FF] underline cursor-pointer pl-1">카카오로 회원가입</a>
          {/* 내부 라우팅이 아니라 외부로 이동하는거라 a태그 사용*/}
        </p>
      </div>
    </main>
  );
}
