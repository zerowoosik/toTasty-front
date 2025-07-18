import { useQuery, UseQueryResult } from '@tanstack/react-query';
import getPostTestKeys from '../getPostTest.keys';
import Post from '../types';

export default function usePostListTestQuery(): UseQueryResult<Post[] | null, Error> {
  return useQuery(getPostTestKeys.list);
}
