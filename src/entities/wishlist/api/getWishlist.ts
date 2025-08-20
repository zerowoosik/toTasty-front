import { getApi } from '@/shared';
import { WishlistInfo } from '../model/types';

export default async function getWishlist(pageParam: number): Promise<WishlistInfo | null> {
  return getApi<WishlistInfo>('/api/v1/wishlist', {
    page: pageParam,
    size: 16,
  });
}
