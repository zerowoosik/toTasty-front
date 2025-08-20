import { getApi } from '@/shared';
import { HomeMeetingCard } from '../model/types';

export default async function getFavoriteMeetings(drinkType: string): Promise<HomeMeetingCard[]> {
  const res = await getApi<{ content: HomeMeetingCard[] }>(
    `/api/v1/meetings?drinkType=${encodeURIComponent(drinkType)}&page=1&size=10`,
  );
  return res?.content ?? [];
}
