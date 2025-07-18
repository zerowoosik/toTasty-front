import { getApi } from '@/shared/api/axiosApis';
import { ReviewList, ReviewFilters } from '../model/types';

export default async function getReviewList(filter: ReviewFilters): Promise<ReviewList | null> {
  return getApi<ReviewList>(`/api/v1/reviews`, filter);
}
