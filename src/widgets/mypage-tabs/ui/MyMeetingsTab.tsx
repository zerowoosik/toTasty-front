'use client';

import { useEffect, useMemo } from 'react';
import { useMeetingListQuery } from '@/entities/meetings/index';
import { Skeleton } from '@/shared';
import { useInView } from 'react-intersection-observer';
import { useUserStore } from '@/entities/user';
import MyMeetingsCardRow from './MyMeetingsCardRow';

export default function MyMeetingsTab() {
  const memberId = useUserStore((state) => state.user?.memberId);

  const { data, fetchNextPage, isPending } = useMeetingListQuery({ memberId });

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const flatMeetings = useMemo(() => data?.pages.flatMap((page) => page.content) ?? [], [data]);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isPending) {
    return <Skeleton className="h-48 w-full rounded-xl bg-gray-020 mb-4" />;
  }

  return (
    <div className="flex flex-col mb-8">
      <MyMeetingsCardRow myMeetingsCardList={flatMeetings} />
      <div ref={ref} />
    </div>
  );
}
