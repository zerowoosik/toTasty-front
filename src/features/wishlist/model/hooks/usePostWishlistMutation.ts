import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import wishlistKeys from '@/entities/wishlist/model/wishlist.keys';
import postWishlist from '../../api/postWishlist';

export default function usePostWishlistMutation(): UseMutationResult<
  void | null,
  Error,
  number,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (meetingId) => postWishlist(meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all.queryKey });
    },
  });
}
