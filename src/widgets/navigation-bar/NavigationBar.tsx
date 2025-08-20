'use client';

import { Logo, NavigationMenu, DropdownMenu, DropdownMenuTrigger, UserIcon } from '@/shared';
import { useUserStore } from '@/entities/user';
import { useShallow } from 'zustand/shallow';
import { NavigationTabs, LoginButton, UserDropdown, ThemeToggleButton } from './ui';

export default function NavigationBar() {
  const { isHydrated, isLoggedIn, profileImgUrl } = useUserStore(
    useShallow((state) => ({
      isHydrated: state.isHydrated,
      isLoggedIn: state.isLoggedIn,
      profileImgUrl: state.user?.profileImgUrl,
    })),
  );

  return (
    <div className="flex justify-center w-full sticky top-0 bg-secondary border-b z-15">
      <div className="flex justify-between h-[75px] w-7xl items-center px-5">
        <NavigationMenu className="gap-6">
          <Logo />
          <NavigationTabs />
        </NavigationMenu>
        <div className="flex gap-2">
          {isHydrated &&
            (isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <UserIcon type="navIcon" ImageUrl={profileImgUrl} className="cursor-pointer" />
                  </div>
                </DropdownMenuTrigger>
                <UserDropdown />
              </DropdownMenu>
            ) : (
              <LoginButton />
            ))}
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}
