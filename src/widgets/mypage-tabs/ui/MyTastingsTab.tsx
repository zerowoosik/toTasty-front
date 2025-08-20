'use client';

import { useEffect, useMemo } from 'react';
import { Skeleton } from '@/shared';
import { useInView } from 'react-intersection-observer';
import { useUserStore } from '@/entities/user';
import { useMyReviewListQuery } from '@/entities/reviews';
import MyTastingsCardRow from './MyTastingsCardRow';

export default function MyTastingsTab() {
  const memberId = useUserStore((state) => state.user?.memberId);
  const { data, fetchNextPage, isPending } = useMyReviewListQuery(memberId);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const flatMyReviewList = useMemo(() => data?.pages.flatMap((page) => page.reviews) ?? [], [data]);
  useEffect(() => {
    if (inView && memberId) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, memberId]);

  if (isPending) {
    return <Skeleton className="h-48 w-full rounded-xl bg-gray-020 mb-4" />;
  }

  return (
    <div className="flex flex-col">
      <MyTastingsCardRow reviewCardList={flatMyReviewList} />
      <div ref={ref} />
    </div>
  );
}
