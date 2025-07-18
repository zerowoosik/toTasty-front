'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { NavigationMenuList, NavigationMenuLink, NavigationMenuItem } from '@/shared';

export default function NavigationTabs() {
  const pathname = usePathname();
  const navigationMenuItems = [
    // TODO : href url 변경
    { title: '모임찾기', href: '/test-page' },
    { title: '찜한모임', href: '/wishlist' },
    { title: '나의 테이스팅', href: '/my-tasting' },
  ];

  function getNavTabClass(href: string) {
    // 내비게이션 탭 하이라이팅을 위한 클래스명 반환
    return clsx('text-base hover:bg-transparent focus:bg-transparent', {
      'font-bold text-[#676DFF] focus:text-[#676DFF] hover:text-[#676DFF]':
        pathname === href || pathname.startsWith(`${href}/`),
    });
  }

  return (
    <NavigationMenuList className="gap-4">
      {navigationMenuItems.map((item) => {
        return (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink className={getNavTabClass(item.href)} asChild>
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  );
}
