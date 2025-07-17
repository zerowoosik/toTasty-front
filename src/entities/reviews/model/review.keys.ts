import { createQueryKeys } from '@lukemorales/query-key-factory';
import { ReviewFilters } from './types';
import getReviewList from '../api/getReviewList';
import getReviewDetail from '../api/getReviewDetail';

const reviewKeys = createQueryKeys('reviews', {
  list: (filter: ReviewFilters) => ({
    queryKey: [filter],
    queryFn: () => getReviewList(filter),
  }),
  detail: (reviewId: number) => ({
    queryKey: [reviewId],
    queryFn: () => getReviewDetail(reviewId),
  }),
});

export default reviewKeys;
