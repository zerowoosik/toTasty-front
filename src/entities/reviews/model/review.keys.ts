import { createQueryKeys } from '@lukemorales/query-key-factory';
import { QueryFunctionContext } from '@tanstack/react-query';
import { ReviewFilters } from './types';
import getReviewList from '../api/getReviewList';
import getReviewDetail from '../api/getReviewDetail';
import getMyReviewList from '../api/getMyReviewList';
import getMeetingReviews from '../api/getMeetingReviews';

const reviewKeys = createQueryKeys('reviews', {
  all: null,
  list: (filter: ReviewFilters) => ({
    queryKey: [filter],
    queryFn: () => getReviewList(filter),
  }),
  detail: (reviewId: number) => ({
    queryKey: [reviewId],
    queryFn: () => getReviewDetail(reviewId),
  }),
  myReviews: (memberId: number | undefined) => ({
    queryKey: [memberId],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext<[number], number>) =>
      getMyReviewList(pageParam),
  }),
  byMeeting: (meetingId: number, size: number) => ({
    queryKey: ['meeting', { meetingId, size }] as const,
    queryFn: ({
      pageParam = 1,
    }: QueryFunctionContext<[string, { meetingId: number; size: number }], number>) =>
      getMeetingReviews(meetingId, pageParam, size),
  }),
});

export default reviewKeys;
