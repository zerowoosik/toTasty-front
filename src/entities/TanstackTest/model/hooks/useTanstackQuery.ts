import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTanstack } from '@/entities/TanstackTest/api/getTanstack';

export function useTanstackQuery(): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ['tanstackRepo'],
    queryFn: getTanstack,
  });
}
