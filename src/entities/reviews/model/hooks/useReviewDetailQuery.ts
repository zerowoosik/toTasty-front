import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ReviewDetailInfo } from '../types';
import reviewKeys from '../review.keys';

export default function useReviewListQuery(
  reviewId: number,
): UseQueryResult<ReviewDetailInfo | null, Error> {
  return useQuery(reviewKeys.detail(reviewId));
}
