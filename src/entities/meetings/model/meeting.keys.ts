import { createQueryKeys } from '@lukemorales/query-key-factory';
import { MeetingFilters } from './types';
import getMeetingList from '../api/getMeetingList';
// import getMeetingDetail from '../api/getMeetingDetail';

const meetingKeys = createQueryKeys('meetings', {
  all: null,
  list: (filter: MeetingFilters) => ({
    queryKey: [filter],
    queryFn: () => getMeetingList(filter),
  }),
  // detail: (meetingId: number) => ({
  //   queryKey: [meetingId],
  //   queryFn: () => getMeetingDetail(meetingId),
  // }),
});
export default meetingKeys;
