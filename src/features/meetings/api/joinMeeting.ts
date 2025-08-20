import { postApi } from '@/shared/api';
import { JoinMeetingRequest, JoinMeetingResponse } from '../model/types';

export default async function joinMeeting({
  meetingId,
}: JoinMeetingRequest): Promise<JoinMeetingResponse> {
  const data = await postApi<JoinMeetingResponse>(
    `/api/v1/meetings/participation/${meetingId}`,
    {},
  );
  return data ?? { meetingId, currentParticipants: 0, isParticipated: true as const };
}
