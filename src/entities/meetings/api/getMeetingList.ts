import { getApi } from '@/shared';
import { MeetingFilters, MeetingListInfo } from '../model/types';

export default async function getMeetingList(
  filter: MeetingFilters,
  pageParam: number,
): Promise<MeetingListInfo | null> {
  return getApi<MeetingListInfo>('/api/v1/meetings', {
    ...filter,
    page: pageParam,
    size: 16,
  });
}
