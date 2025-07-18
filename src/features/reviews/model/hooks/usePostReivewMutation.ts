import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import reviewKeys from '@/entities/reviews/model/review.keys';
import { PostReviewInfo, ReviewSucceedInfo } from '../types';
import postReview from '../../api/postReview';

export default function usePostReivewMutation(
  post: PostReviewInfo,
): UseMutationResult<ReviewSucceedInfo | null, Error, void, unknown> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postReview(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys._def });
    },
  });
}
