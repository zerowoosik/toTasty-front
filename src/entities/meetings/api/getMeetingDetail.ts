import { getApi } from '@/shared';
import { MeetingFilters, MeetingList } from '../model/types';

export default async function getMeetingList(
  filter: MeetingFilters,
): Promise<MeetingList[] | null> {
  return getApi('/api/v1/meetings', { params: filter });
}
