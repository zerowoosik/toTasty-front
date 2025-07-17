import { useQuery, UseQueryResult } from '@tanstack/react-query';
import getTastingList from '@/entities/tasting-list/api/getTastingList';
import { TastingList } from '../types';

export default function useTastingListQuery(
  meetingId: number,
): UseQueryResult<TastingList | null, Error> {
  return useQuery({
    queryKey: ['tasting-list'],
    queryFn: () => getTastingList(meetingId),
  });
}
