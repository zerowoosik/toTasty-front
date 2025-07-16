import { getApi } from '@/shared/api/axiosApis';
import ReviewList from '../model/types';

export async function getReviewList(meetingId: number): Promise<ReviewList | null> {
  return getApi<ReviewList>(`/reviews`);
}
