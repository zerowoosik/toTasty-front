import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postReview } from '../../api/postReview';
import { PostReviewInfo, ReviewSucceedInfo } from '../types';

export function usePostReivewMutation(
  post: PostReviewInfo,
): UseMutationResult<ReviewSucceedInfo | null, Error, void, unknown> {
  return useMutation({ mutationFn: () => postReview(post) });
}
