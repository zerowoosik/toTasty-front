import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTanstack } from '@/entities/TanstackTest/api/getTanstack';
import TanstackInfo from '../types';

export function useTanstackQuery(): UseQueryResult<TanstackInfo | null, Error> {
  return useQuery({
    queryKey: ['tanstackRepo'],
    queryFn: getTanstack,
  });
}
