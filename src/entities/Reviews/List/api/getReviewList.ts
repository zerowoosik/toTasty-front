import { getApi } from '@/shared/api/axiosApis';
import { ReviewList } from '../model/types';

export async function getReviewList(
  page: number,
  size: number,
  pageFlag: number,
  meetingId?: number,
): Promise<ReviewList | null> {
  return getApi<ReviewList>(`/reviews`, {
    page,
    size,
    pageFlag,
    meetingId,
  });
}
