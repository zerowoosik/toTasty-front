import { getApi } from '@/shared/api/axiosApis';
import { TanstackInfo } from '@/entities/TanstackTest/model/types';

export async function getTanstack(): Promise<TanstackInfo | null> {
  return getApi<TanstackInfo>('/repos/TanStack/query', {}, 'https://api.github.com');
}
