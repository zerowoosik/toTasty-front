import {
  useInfiniteQuery,
  type InfiniteData,
  type InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import reviewKeys from '../review.keys';
import type { ReviewList } from '../types';

export default function useMeetingReviewsQuery(
  meetingId: number,
  size = 5,
): InfiniteQueryObserverResult<InfiniteData<ReviewList>> {
  return useInfiniteQuery<ReviewList>({
    ...reviewKeys.byMeeting(meetingId, size),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.pageInfo.hasNextPage ? pages.length + 1 : undefined,
  });
}
