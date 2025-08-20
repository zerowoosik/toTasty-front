'use client';

import { useEffect, useMemo } from 'react';
import { useMeetingListQuery } from '@/entities/meetings/index';
import { Skeleton } from '@/shared';
import { useInView } from 'react-intersection-observer';
import FindMeetingCardRow from './ui/FindMeetingCardRow';
import useFilterStore from './model/hooks/useFilterStore';

export default function FindMeetingList() {
  const filters = useFilterStore((state) => state.filters);

  const { data, fetchNextPage, isPending } = useMeetingListQuery(filters);

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
    return <Skeleton className="h-[1020px] w-full rounded-xl bg-gray-020" />;
  }

  return (
    <div className="flex flex-col mb-8">
      <FindMeetingCardRow meetingCardList={flatMeetings} />
      <div ref={ref} />
    </div>
  );
}
