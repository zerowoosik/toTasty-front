import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user';
import homeMeetingCardKeys from '../homeMeetingCard.keys';
import { HomeMeetingCard } from '../types';

export default function useWishlistMeetingsQuery(): UseQueryResult<HomeMeetingCard[] | null> {
  const userId = useUserStore((state) => state.user?.memberId);

  return useQuery(homeMeetingCardKeys.wishlist(userId));
}
