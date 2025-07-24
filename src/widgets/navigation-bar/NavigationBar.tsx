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
    <div className="flex justify-center w-full sticky top-0 bg-white border-b border-gray-020 z-15">
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
