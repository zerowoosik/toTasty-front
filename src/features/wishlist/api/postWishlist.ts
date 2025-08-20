import { postApi } from '@/shared';

export default async function postWishlist(meetingId: number): Promise<void | null> {
  return postApi<void>(`/api/v1/wishlist/${meetingId}`, {});
}
