import { getApi } from '@/shared/api/axiosApis';
import { TastingList } from '@/entities/tasting-list/model/types';

export default async function getTastingList(meetingId: number): Promise<TastingList | null> {
  const response = getApi<TastingList>(`/api/v1/tasting-list/${meetingId}`);
  response.then((res) => {
    res?.tastingList.map((item) => {
      return {
        ...item,
        drinkColor: item.drinkColor || '',
        drinkFlavor: item.drinkFlavor || '',
        drinkTaste: item.drinkTaste || '',
      };
    });
    return res;
  });
  return response;
}
