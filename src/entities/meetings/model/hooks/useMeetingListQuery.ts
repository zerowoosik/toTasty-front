import { useInfiniteQuery, InfiniteQueryObserverResult, InfiniteData } from '@tanstack/react-query';
import { MeetingFilters, MeetingListInfo } from '../types';
import meetingKeys from '../meeting.keys';

export default function useMeetingListQuery(
  filter: MeetingFilters,
): InfiniteQueryObserverResult<InfiniteData<MeetingListInfo>> {
  return useInfiniteQuery<MeetingListInfo>({
    ...meetingKeys.list(filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.sliceInfo.hasNext) {
        return pages.length + 1;
      }
      return undefined;
    },
  });
}
