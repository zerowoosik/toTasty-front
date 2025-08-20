'use client';

import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/shared';
import Link from 'next/link';
import { useLogout } from '@/features/logout';

export default function UserDropdown() {
  const { handleLogout } = useLogout();
  return (
    <DropdownMenuContent className="w-30">
      <DropdownMenuGroup>
        {/* <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
          {theme === Theme.dark ? '다크모드 해제' : '다크모드로 전환'}
        </DropdownMenuItem> */}
        <Link href="/my-page/meetings" className="text-foreground">
          <DropdownMenuItem className="cursor-pointer">마이페이지</DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
