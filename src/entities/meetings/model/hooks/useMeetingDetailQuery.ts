import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { MeetingDetailInfo } from '../types';
import meetingKeys from '../meeting.keys';

export default function useMeetingDetailQuery(
  meetingId: number,
): UseQueryResult<MeetingDetailInfo | null, Error> {
  return useQuery(meetingKeys.detail(meetingId));
}
