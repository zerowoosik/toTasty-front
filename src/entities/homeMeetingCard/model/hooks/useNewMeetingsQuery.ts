import { useQuery, UseQueryResult } from '@tanstack/react-query';
import homeMeetingCardKeys from '../homeMeetingCard.keys';
import { HomeMeetingCard } from '../types';

export default function useNewMeetingsQuery(): UseQueryResult<HomeMeetingCard[] | null> {
  return useQuery(homeMeetingCardKeys.newList());
}
