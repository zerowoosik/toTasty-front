import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ReissueResponse } from '../../../user/model/types';
import getAccessToken from '../../api/getAccessToken';

export default function useAccessTokenQuery(
  enabled: boolean,
): UseQueryResult<ReissueResponse | null, Error> {
  return useQuery({ queryKey: ['reissue'], queryFn: () => getAccessToken(), enabled });
}
