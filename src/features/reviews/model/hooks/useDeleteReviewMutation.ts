import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import reviewKeys from '@/entities/reviews/model/review.keys';
import { ReviewSucceedInfo } from '../types';
import deleteReview from '../../api/deleteReview';

export default function useDeleteReivewMutation(
  reviewId: number,
): UseMutationResult<ReviewSucceedInfo | null, Error, void, unknown> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all.queryKey });
    },
  });
}
