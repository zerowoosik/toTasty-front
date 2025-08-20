import { createQueryKeys } from '@lukemorales/query-key-factory';
import { QueryFunctionContext } from '@tanstack/react-query';
import { MeetingFilters } from './types';
import getMeetingList from '../api/getMeetingList';
import getMeetingDetail from '../api/getMeetingDetail';

const meetingKeys = createQueryKeys('meetings', {
  all: null,
  list: (filter: MeetingFilters) => ({
    queryKey: [filter],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext<[MeetingFilters], number>) =>
      getMeetingList(filter, pageParam),
  }),
  detail: (meetingId: number) => ({
    queryKey: [meetingId],
    queryFn: () => getMeetingDetail(meetingId),
  }),
});
export default meetingKeys;
