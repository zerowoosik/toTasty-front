import { getApi } from '@/shared/api/axiosApis';
import { ReviewDetailInfo } from '../model/types';

export default async function getReviewDetail(reviewId: number): Promise<ReviewDetailInfo | null> {
  return getApi<ReviewDetailInfo>(`/api/v1/reviews/${reviewId}`);
}
