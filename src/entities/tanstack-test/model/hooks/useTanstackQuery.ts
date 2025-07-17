import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTanstack } from '@/entities/tanstack-test/api/getTanstack';
import TanstackInfo from '../types';

export function useTanstackQuery(): UseQueryResult<TanstackInfo | null, Error> {
  return useQuery({
    queryKey: ['tanstackRepo'],
    queryFn: getTanstack,
  });
}
