'use client';

import { Logo, NavigationMenu, DropdownMenu, DropdownMenuTrigger } from '@/shared';
import { useUserStore } from '@/entities/user';
import { useShallow } from 'zustand/shallow';
import { NavigationTabs, LoginButton, UserDropdown, UserIcon } from './ui';

export default function NavigationBar() {
  const { isLoggedIn } = useUserStore(
    useShallow((state) => ({
      // 선택자 함수로 필요한 속성만 구독, useShallow를 사용해 불필요한 리렌더링 방지
      isLoggedIn: state.isLoggedIn,
    })),
  );
  // const isLoggedIn = true;
  return (
    <div className="w-full bg-white flex justify-center border-b border-[#E3E7EB] sticky top-0 z-50">
      <div className="flex justify-between h-[75px] w-7xl items-center px-5">
        <NavigationMenu className="gap-6">
          <Logo />
          <NavigationTabs />
        </NavigationMenu>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <UserIcon />
              </div>
            </DropdownMenuTrigger>
            <UserDropdown />
          </DropdownMenu>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
