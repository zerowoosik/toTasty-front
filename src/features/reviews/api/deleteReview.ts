import { deleteApi } from '@/shared/api/axiosApis';
import { ReviewSucceedInfo } from '../model/types';

export async function deleteReview(reviewId: number): Promise<ReviewSucceedInfo | null> {
  return deleteApi<ReviewSucceedInfo>(`/posts/${reviewId}`);
}
