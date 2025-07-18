import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ReviewList, ReviewFilters } from '../types';
import reviewKeys from '../review.keys';

export default function useReviewListQuery(
  filter: ReviewFilters,
): UseQueryResult<ReviewList | null, Error> {
  return useQuery(reviewKeys.list(filter));
}
