'use client';

import { PostReview } from '@/widgets';
import { useTastingListQuery } from '@/entities/tasting-list';

export default function PostReviewView({ meetingId }: { meetingId: number }) {
  const { isPending, data } = useTastingListQuery(meetingId);

  if (isPending) {
    return '';
  }
  return (
    <div className="max-w-5xl mx-auto">
      <PostReview tastingList={data?.tastingList ?? []} meetingId={meetingId} />
    </div>
  );
}
