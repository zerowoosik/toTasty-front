import { createQueryKeys } from '@lukemorales/query-key-factory';
import { QueryFunctionContext } from '@tanstack/react-query';
import getWishlist from '../api/getWishlist';

const wishlistKeys = createQueryKeys('wishlist', {
  all: null,
  list: (memberId: number | undefined) => ({
    queryKey: [memberId],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext<[number], number>) => getWishlist(pageParam),
  }),
});

export default wishlistKeys;
