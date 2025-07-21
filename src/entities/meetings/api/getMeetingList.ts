import { getApi } from '@/shared';
import { MeetingFilters, MeetingList } from '../model/types';

export default async function getMeetingList(
  filter: MeetingFilters,
): Promise<MeetingList[] | null> {
  const res = await getApi('/api/v1/meetings', { params: filter });
  return res ? res.content : null;
}
