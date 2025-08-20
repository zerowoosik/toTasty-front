import { getApi } from '@/shared';
import type { ReviewList } from '../model/types';

export default async function getMeetingReviews(
  meetingId: number,
  currentPage: number,
  size: number,
): Promise<ReviewList | null> {
  if (!meetingId) throw new Error('meetingId is required');
  return getApi<ReviewList>(
    `/api/v1/meetings/${meetingId}/reviews?page=${currentPage}&size=${size}`,
    {
      currentPage,
      size,
    },
  );
}
