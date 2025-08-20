import { deleteApi } from '@/shared';

export default async function deleteWishlist(meetingId: number): Promise<void | null> {
  return deleteApi<void>(`/api/v1/wishlist/${meetingId}`);
}
