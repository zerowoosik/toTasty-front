import { getApi } from '@/shared/api/axiosApis';
import { TastingList } from '@/entities/tasting-list/model/types';

export async function getTastingList(meetingId: number): Promise<TastingList | null> {
  return getApi<TastingList>(`/tasing-list/${meetingId}`);
}
