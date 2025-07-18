import { useQuery, UseQueryResult } from '@tanstack/react-query';
import getPostTestKeys from '../getPostTest.keys';
import Post from '../types';

export default function usePostDetailTestQuery(postId: number): UseQueryResult<Post | null, Error> {
  return useQuery(getPostTestKeys.detail(postId));
}
