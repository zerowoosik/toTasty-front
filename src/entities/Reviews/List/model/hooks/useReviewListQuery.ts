import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getReviewList } from '../../api/getReviewList';

export function useReviewListQuery(postId: number): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ['tasting-list'],
    queryFn: () => getReviewList(postId),
  });
}
