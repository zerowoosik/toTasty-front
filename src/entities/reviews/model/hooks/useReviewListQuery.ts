import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ReviewList } from '../types';
import getReviewList from '../../api/getReviewList';

export default function useReviewListQuery(
  page: number,
  size: number,
  pageFlag: number,
  meetingId?: number,
): UseQueryResult<ReviewList | null, Error> {
  return useQuery({
    queryKey: ['review-list'],
    queryFn: () => getReviewList(page, size, pageFlag, meetingId),
  });
}
