import { getApi } from '@/shared';
import { HomeMeetingCard } from '../model/types';

export default async function getNewMeetings(): Promise<HomeMeetingCard[] | null> {
  const res = await getApi<{ content: HomeMeetingCard[] }>('/api/v1/meetings?page=1&size=10');
  return res ? res.content : null;
}
