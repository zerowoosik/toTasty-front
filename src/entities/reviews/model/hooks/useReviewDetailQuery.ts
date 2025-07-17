import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ReviewDetailInfo } from '../types';
import getReviewDetail from '../../api/getReviewDetail';

export default function useReviewListQuery(
  reviewId: number,
): UseQueryResult<ReviewDetailInfo | null, Error> {
  return useQuery({
    queryKey: ['review-detail'],
    queryFn: () => getReviewDetail(reviewId),
  });
}
