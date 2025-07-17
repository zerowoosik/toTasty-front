import { postApi } from '@/shared/api/axiosApis';
import { PostReviewInfo, ReviewSucceedInfo } from '../model/types';

export async function postReview(post: PostReviewInfo): Promise<ReviewSucceedInfo | null> {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  return postApi<ReviewSucceedInfo>('/posts', post, headers);
}
