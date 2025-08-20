'use client';

import { ReviewDetail } from '@/widgets';
import { useReviewDetailQuery } from '@/entities/reviews';

export default function ReviewView({ reviewId }: { reviewId: number }) {
  const { isPending, data } = useReviewDetailQuery(reviewId);

  if (isPending) {
    return '';
  }

  if (data) {
    return (
      <div className="max-w-5xl mx-auto">
        <ReviewDetail reviewDetailInfo={data} />
      </div>
    );
  }
}
