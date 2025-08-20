'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMeetingReviewsQuery } from '@/entities/reviews';
import { Button, getFormattedDate } from '@/shared';

export default function MeetingDetailReviews({ meetingId }: { meetingId: number }) {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMeetingReviewsQuery(meetingId, 10);

  if (isLoading) return <div>리뷰 불러오는 중…</div>;
  if (error) return <div>리뷰 로딩 오류가 발생했습니다.</div>;

  const all = data?.pages.flatMap((p) => p.reviews) ?? [];
  if (all.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">아직 리뷰가 없어요.</div>;
  }

  return (
    <div className="space-y-6">
      {all.map((r) => (
        <div
          key={r.reviewId}
          className="border-b px-2 py-4 last:border-b-0 last:pb-0 first:pt-0 space-y-1"
        >
          <Link href={`/reviews/${r.reviewId}`}>
            <div className="mt-2 flex items-center gap-1" aria-label={`평점 ${r.reviewRating}점`}>
              {Array.from({ length: 5 }).map((_, i) => {
                const isChecked = i < r.reviewRating;
                const key = `heart-${r.reviewId}-${i}`;
                return (
                  <Image
                    key={key}
                    src={
                      isChecked
                        ? '/assets/icons/heart-point-checked.svg'
                        : '/assets/icons/heart-point-unchecked.svg'
                    }
                    alt={isChecked ? '하트 채움' : '하트 비움'}
                    width={20}
                    height={20}
                  />
                );
              })}
            </div>
            <p className="max-h-12 line-clamp-2">{r.reviewContent}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Image
                src={r.memberProfileImageUrl}
                alt={r.memberNickname}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <span className="font-medium text-foreground pr-2">{r.memberNickname}</span>
              <span className="border border-muted inline h-4" />
              <span>{getFormattedDate(r.reviewDate, 'dot')}</span>
            </div>
          </Link>
        </div>
      ))}

      {hasNextPage && (
        <Button
          className="mx-auto mt-2 block rounded-lg border px-4 py-2 text-sm"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '불러오는 중…' : '더 보기'}
        </Button>
      )}
    </div>
  );
}
