import { InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery } from '@tanstack/react-query';
import reviewKeys from '../review.keys';
import { ReviewList } from '../types';

export default function useMyReviewListQuery(
  memberId: number | undefined,
): InfiniteQueryObserverResult<InfiniteData<ReviewList>> {
  return useInfiniteQuery<ReviewList>({
    ...reviewKeys.myReviews(memberId),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pageInfo.hasNextPage) {
        return pages.length + 1;
      }
      return undefined;
    },
  });
}
