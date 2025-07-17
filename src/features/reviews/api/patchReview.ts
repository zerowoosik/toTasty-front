import { patchApi } from '@/shared/api/axiosApis';
import { PostReviewInfo, ReviewSucceedInfo } from '../model/types';

export async function patchReview(
  reviewId: number,
  post: PostReviewInfo,
): Promise<ReviewSucceedInfo | null> {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  return patchApi<ReviewSucceedInfo>(`/posts/${reviewId}`, post, headers);
}
