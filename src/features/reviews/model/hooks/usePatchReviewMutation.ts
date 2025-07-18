import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { PostReviewInfo, ReviewSucceedInfo } from '../types';
import reviewKeys from '@/entities/reviews/model/review.keys';
import patchReview from '../../api/patchReview';

export default function usePatchReivewMutation(
  reviewId: number,
  post: PostReviewInfo,
): UseMutationResult<ReviewSucceedInfo | null, Error, void, unknown> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchReview(reviewId, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.detail(reviewId).queryKey });
    },
  });
}
