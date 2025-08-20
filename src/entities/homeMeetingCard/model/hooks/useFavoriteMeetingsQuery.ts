import { useQuery, UseQueryResult } from '@tanstack/react-query';
import homeMeetingCardKeys from '../homeMeetingCard.keys';
import { HomeMeetingCard } from '../types';
import getFavoriteMeetings from '../../api/getFavoriteMeetings';

export default function useFavoriteMeetingsQuery(
  interests: string[],
): UseQueryResult<HomeMeetingCard[]> {
  const sorted = [...(interests ?? [])].sort();
  const { queryKey } = homeMeetingCardKeys.favorite(sorted);

  return useQuery<HomeMeetingCard[]>({
    queryKey,
    enabled: sorted.length > 0,
    placeholderData: () => [],
    queryFn: async () => {
      const pages = await Promise.all(sorted.map((type) => getFavoriteMeetings(type)));
      const allMeetings = pages.flat();

      const now = Date.now();
      const upcoming = allMeetings.filter((m) => {
        const deadline = m.joinEndAt ? Date.parse(m.joinEndAt) : Number.POSITIVE_INFINITY;
        const isOpen = m.status ? m.status === 'open' : true;
        return Number.isFinite(deadline) && deadline >= now && isOpen;
      });

      upcoming.sort((a, b) => {
        const da = a.joinEndAt ? Date.parse(a.joinEndAt) : Number.POSITIVE_INFINITY;
        const db = b.joinEndAt ? Date.parse(b.joinEndAt) : Number.POSITIVE_INFINITY;
        if (da !== db) return da - db;
        const sa = a.startAt ? Date.parse(a.startAt) : Number.POSITIVE_INFINITY;
        const sb = b.startAt ? Date.parse(b.startAt) : Number.POSITIVE_INFINITY;
        return sa - sb;
      });

      return upcoming.slice(0, 10);
    },
  });
}
