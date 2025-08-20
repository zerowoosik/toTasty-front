import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import reviewKeys from '@/entities/reviews/model/review.keys';
import { PostReviewInfo, ReviewSucceedInfo } from '../types';
import postReview from '../../api/postReview';

export default function usePostReviewMutation(): UseMutationResult<
  ReviewSucceedInfo | null,
  Error,
  PostReviewInfo,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: PostReviewInfo) => postReview(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all.queryKey });
    },
  });
}
