import { InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery } from '@tanstack/react-query';
import wishlistKeys from '../wishlist.keys';
import { WishlistInfo } from '../types';

export default function useWishlistQuery(
  memberId: number | undefined,
): InfiniteQueryObserverResult<InfiniteData<WishlistInfo>> {
  return useInfiniteQuery<WishlistInfo>({
    ...wishlistKeys.list(memberId),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.sliceInfo.hasNext) {
        return pages.length + 1;
      }
      return undefined;
    },
  });
}
