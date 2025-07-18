import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { PostReviewInfo, ReviewSucceedInfo } from '../types';
import postReview from '../../api/postReview';

export default function usePostReivewMutation(
  post: PostReviewInfo,
): UseMutationResult<ReviewSucceedInfo | null, Error, void, unknown> {
  return useMutation({ mutationFn: () => postReview(post) });
}
