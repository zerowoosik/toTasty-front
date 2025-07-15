import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchTanstack } from '../api/fetchTanstack';

export function useTanstackQuery(): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ['tanstackRepo'],
    queryFn: fetchTanstack,
  });
}
