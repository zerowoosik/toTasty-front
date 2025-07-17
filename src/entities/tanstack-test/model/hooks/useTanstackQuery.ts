import { useQuery, UseQueryResult } from '@tanstack/react-query';
import getTanstack from '../../api/getTanstack';
import TanstackInfo from '../types';

export default function useTanstackQuery(): UseQueryResult<TanstackInfo | null, Error> {
  return useQuery({
    queryKey: ['tanstackRepo'],
    queryFn: getTanstack,
  });
}
