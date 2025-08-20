import { getApi } from '@/shared';
import { ReviewList } from '../model/types';

export default async function getMyReviewList(pageParam: number): Promise<ReviewList | null> {
  return getApi<ReviewList>('/api/v1/my/reviews', {
    currentPage: pageParam,
    size: 16,
  });
}
