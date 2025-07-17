import { getApi } from '@/shared/api/axiosApis';
import TanstackInfo from '@/entities/tanstack-test/model/types';

export async function getTanstack(): Promise<TanstackInfo | null> {
  return getApi<TanstackInfo>(
    '/repos/TanStack/query',
    { test: 1 },
    {}, // {Authorization : 'bearer ~~'}
    'https://api.github.com',
  );
}
