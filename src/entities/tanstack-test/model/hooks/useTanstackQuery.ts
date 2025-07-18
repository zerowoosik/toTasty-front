import { useQuery, UseQueryResult } from '@tanstack/react-query';
import tanstackRepoKeys from '@/entities/tanstack-test/model/tanstack.keys';
import TanstackInfo from '../types';

export default function useTanstackQuery(): UseQueryResult<TanstackInfo | null, Error> {
  return useQuery(tanstackRepoKeys.repo);
}
