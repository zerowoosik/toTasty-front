'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared';
import { ReactNode } from 'react';

const tabTriggerClass =
  'relative px-0 py-2 rounded-none text-lg text-secondary-foreground hover:text-foreground cursor-pointer border-none dark:border-none data-[state=active]:border-none dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent data-[state=active]:bg-transparent' +
  'data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:bg-transparent ' +
  'data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 ' +
  'data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-foreground';

const tabs = [
  { value: 'meetings', label: '나의 모임' },
  { value: 'tastings', label: '나의 테이스팅 북' },
  { value: 'wishlist', label: '위시리스트' },
];

export default function MyPageTabs({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const onTabChange = (value: string): void => {
    router.push(`/my-page/${value}`);
  };

  // pathname 예: "/my-page/tastings" → 탭 값: "tastings"
  const currentPathValue = pathname.split('/')[2] || 'meetings';

  return (
    <div className="max-w-[992px] bg-secondary mt-6">
      <Tabs
        value={currentPathValue}
        onValueChange={onTabChange}
        className="w-full border-t-2 border-muted px-4"
      >
        <TabsList className="relative bg-transparent justify-start overflow-x-auto overflow-y-hidden h-auto p-0 rounded-none py-2 gap-6">
          {tabs.map((tab) => (
            <TabsTrigger className={tabTriggerClass} key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={currentPathValue}>{children}</TabsContent>
      </Tabs>
    </div>
  );
}
