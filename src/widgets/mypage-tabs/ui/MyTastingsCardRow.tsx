'use client';

import Image from 'next/image';
import type { ReviewContent } from '@/entities/reviews';
import { formatDateToDotString } from '@/shared/lib';
import Link from 'next/link';

interface ReviewList {
  reviewCardList: ReviewContent[] | null | undefined;
}

function RatingHearts({ rating = 0, size = 16 }: { rating?: number; size?: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex items-center gap-1" aria-label={`평점 ${r}점 (최대 5점)`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const key = `heartKey${i};`;
        const isFilled = i < r;
        const src = isFilled
          ? '/assets/icons/heart-point-checked.svg'
          : '/assets/icons/heart-point-unchecked.svg';

        return (
          <Image
            key={key}
            src={src}
            alt={isFilled ? '채워진 하트' : '빈 하트'}
            width={size}
            height={size}
            priority
          />
        );
      })}
    </div>
  );
}

export default function MyTastingsCardRow({ reviewCardList }: ReviewList) {
  const displayList = reviewCardList || [];
  if (displayList.length > 0) {
    return (
      <ul className="divide-y divide-dashed">
        {displayList.map((review) => (
          <li key={review.reviewId} className="my-6">
            <Link href={`/reviews/${review.reviewId}`}>
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src={review.thumbnailUrl}
                  alt="리뷰 썸네일"
                  width={280}
                  height={156}
                  layout="fixed"
                  className="h-[156px] w-[280px] object-cover rounded-2xl border flex-shrink-0"
                />
                <div className="flex-1 min-w-0 px-3 flex flex-col h-[156px] gap-3">
                  <div className="flex items-center gap-2 pt-1 text-muted-foreground">
                    <span className="font-bold text-foreground text-base">
                      {review.meetingTitle}
                    </span>
                    <span className="text-xs font-medium">
                      {formatDateToDotString(review.reviewDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RatingHearts rating={review.reviewRating} size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-070 line-clamp-3">
                    {review.reviewContent}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col h-[500px] w-full items-center justify-center">
      <p className="text-muted-foreground text-sm font-medium items-center justify-center">
        아직 테이스팅 북이 비어 있어요.
      </p>
      <p className="text-muted-foreground text-sm font-medium items-center justify-center">
        모임에 참여하고 테이스팅 북을 작성해보세요.
      </p>
    </div>
  );
}
