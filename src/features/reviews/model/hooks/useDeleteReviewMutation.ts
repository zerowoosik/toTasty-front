import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { ReviewSucceedInfo } from '../types';
import deleteReview from '../../api/deleteReview';
import reviewKeys from '@/entities/reviews/model/review.keys';

export default function useDeleteReivewMutation(
  reviewId: number,
): UseMutationResult<ReviewSucceedInfo | null, Error, void, unknown> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys._def });
    },
  });
}
