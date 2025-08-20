import { getApi } from '@/shared';
import { HomeMeetingCard } from '../model/types';

export default async function getWishlistMeetings(): Promise<HomeMeetingCard[] | null> {
  const res = await getApi<{ content: HomeMeetingCard[] }>('/api/v1/wishlist?page=1&size=10');
  return res ? res.content : null;
}
