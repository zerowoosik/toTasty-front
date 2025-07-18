import { createQueryKeys } from '@lukemorales/query-key-factory';
import getTastingList from '../api/getTastingList';

const tastingListKeys = createQueryKeys('tanstack', {
  list: (meetingId: number) => ({
    queryKey: [meetingId],
    queryFn: () => getTastingList(meetingId),
  }),
});

export default tastingListKeys;
