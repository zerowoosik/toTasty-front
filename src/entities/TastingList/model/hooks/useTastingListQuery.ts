import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTastingList } from '@/entities/TastingList/api/getTastingList';

export function useTastingListQuery(meetingId: number): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ['tasting-list'],
    queryFn: () => getTastingList(meetingId),
  });
}
