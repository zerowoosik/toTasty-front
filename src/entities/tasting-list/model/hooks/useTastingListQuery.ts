import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TastingList } from '../types';
import tastingListKeys from '../tasting-list.keys';

export default function useTastingListQuery(
  meetingId: number,
): UseQueryResult<TastingList | null, Error> {
  return useQuery(tastingListKeys.list(meetingId));
}
