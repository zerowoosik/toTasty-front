import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import wishlistKeys from '@/entities/wishlist/model/wishlist.keys';
import deleteWishlist from '../../api/deleteWishlist';

export default function useDeleteWishlistMutation(): UseMutationResult<
  void | null,
  Error,
  number,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (meetingId) => deleteWishlist(meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all.queryKey });
    },
  });
}
