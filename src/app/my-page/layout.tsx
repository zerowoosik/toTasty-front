'use client';

import { useUserStore } from '@/entities/user';
import { UserProfileCard, MyPageTabs } from '@/widgets';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}
function AuthGuard({ children, redirectTo = '/login' }: AuthGuardProps) {
  const router = useRouter();
  const { isLoggedIn, isHydrated } = useUserStore();
  const prevIsLoggedIn = useRef(isLoggedIn);

  useEffect(() => {
    // 이전에 로그인 상태였다가 로그아웃된 경우는 무시
    const wasLoggedOut = prevIsLoggedIn.current === true && isLoggedIn === false;

    if (isHydrated && !isLoggedIn && !wasLoggedOut) {
      router.push(redirectTo);
    }

    prevIsLoggedIn.current = isLoggedIn;
  }, [isHydrated, isLoggedIn, redirectTo]);

  if (!isHydrated || !isLoggedIn) {
    return <div />;
  }

  return children;
}

export default function MypageLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex justify-center">
        <div className="w-full max-w-[992px] flex flex-col my-8 gap-8">
          <span className="text-2xl font-semibold">마이 페이지</span>
          <UserProfileCard />
          <MyPageTabs>{children}</MyPageTabs>
        </div>
      </div>
    </AuthGuard>
  );
}
