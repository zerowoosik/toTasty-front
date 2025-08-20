import { deleteApi } from '@/shared/api';
import { CancelMeetingRequest, CancelMeetingResponse } from '../model/types';

export default async function cancelMeeting({
  meetingId,
}: CancelMeetingRequest): Promise<CancelMeetingResponse> {
  const data = await deleteApi<CancelMeetingResponse>(`/api/v1/meetings/${meetingId}`);
  return data ?? { meetingId, status: 'cancelled' };
}
