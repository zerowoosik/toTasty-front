import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { MeetingFilters, MeetingList } from '../types';
import meetingKeys from '../meeting.keys';

export default function useMeetingListQuery(
  filter: MeetingFilters,
): UseQueryResult<MeetingList[] | null, Error> {
  return useQuery(meetingKeys.list(filter));
}
