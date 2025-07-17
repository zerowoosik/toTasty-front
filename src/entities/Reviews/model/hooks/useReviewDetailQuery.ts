import { useQuery, UseQueryResult } from '@tanstack/react-query';
import getReviewDetail from '@/entities/Reviews/api/getReviewDetail';
import { ReviewDetailInfo } from '../types';

export function useReviewListQuery(
  reviewId: number,
): UseQueryResult<ReviewDetailInfo | null, Error> {
  return useQuery({
    queryKey: ['review-detail'],
    queryFn: () => getReviewDetail(reviewId),
  });
}
