import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getReviewList } from '../../api/getReviewList';

export function useReviewListQuery(
  page: number,
  size: number,
  pageFlag: number,
  meetingId?: number,
): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ['tasting-list'],
    queryFn: () => getReviewList(page, size, pageFlag, meetingId),
  });
}
