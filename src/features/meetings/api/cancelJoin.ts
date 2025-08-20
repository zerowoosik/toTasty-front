import { deleteApi } from '@/shared/api';
import { CancelJoinRequest, CancelJoinResponse } from '../model/types';

export default async function cancelJoin({
  meetingId,
}: CancelJoinRequest): Promise<CancelJoinResponse> {
  const data = await deleteApi<CancelJoinResponse>(`/api/v1/meetings/participation/${meetingId}`);
  return data ?? { meetingId, currentParticipants: 0, isParticipated: false as const };
}
