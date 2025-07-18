import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TastingList } from '../types';
import getTastingList from '../../api/getTastingList';

export default function useTastingListQuery(
  meetingId: number,
): UseQueryResult<TastingList | null, Error> {
  return useQuery({
    queryKey: ['tasting-list'],
    queryFn: () => getTastingList(meetingId),
  });
}
