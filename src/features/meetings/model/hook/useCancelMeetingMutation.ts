import { useMutation, useQueryClient } from '@tanstack/react-query';
import meetingKeys from '@/entities/meetings/model/meeting.keys';
import type { MeetingDetailInfo } from '@/entities/meetings/model/types';
import cancelMeeting from '../../api/cancelMeeting';
import type { CancelMeetingRequest, CancelMeetingResponse, MutationCtx } from '../types';

export default function useCancelMeetingMutation() {
  const qc = useQueryClient();

  return useMutation<CancelMeetingResponse, Error, CancelMeetingRequest, MutationCtx>({
    mutationFn: cancelMeeting,

    onMutate: async ({ meetingId }) => {
      const detailKey = meetingKeys.detail(meetingId).queryKey;
      await qc.cancelQueries({ queryKey: detailKey });

      const prev = qc.getQueryData<MeetingDetailInfo>(detailKey);
      if (prev) {
        qc.setQueryData<MeetingDetailInfo>(detailKey, { ...prev, status: 'cancelled' });
      }

      qc.invalidateQueries({ queryKey: meetingKeys.all.queryKey });

      return { prev, detailKey };
    },

    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(ctx.detailKey, ctx.prev);
    },

    onSettled: (_res, _err, { meetingId }) => {
      qc.invalidateQueries({ queryKey: meetingKeys.detail(meetingId).queryKey });
      qc.invalidateQueries({ queryKey: meetingKeys.all.queryKey });
    },
  });
}
