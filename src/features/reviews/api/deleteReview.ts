import { deleteApi } from '@/shared';
import { ReviewSucceedInfo } from '../model/types';

export default async function deleteReview(reviewId: number): Promise<ReviewSucceedInfo | null> {
  return deleteApi<ReviewSucceedInfo>(`/posts/${reviewId}`);
}
