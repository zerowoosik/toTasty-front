import { useMutation, useQueryClient } from '@tanstack/react-query';
import meetingKeys from '@/entities/meetings/model/meeting.keys';
import type { MeetingDetailInfo } from '@/entities/meetings/model/types';
import joinMeeting from '../../api/joinMeeting';
import type { JoinMeetingRequest, JoinMeetingResponse, MutationCtx } from '../types';

export default function useJoinMeetingMutation() {
  const qc = useQueryClient();

  return useMutation<JoinMeetingResponse, Error, JoinMeetingRequest, MutationCtx>({
    mutationFn: joinMeeting,

    onMutate: async ({ meetingId }) => {
      const detailKey = meetingKeys.detail(meetingId).queryKey;
      await qc.cancelQueries({ queryKey: detailKey });

      const prev = qc.getQueryData<MeetingDetailInfo>(detailKey);
      if (prev) {
        const next = Math.min(prev.currentParticipants + 1, prev.maxParticipants);
        qc.setQueryData<MeetingDetailInfo>(detailKey, {
          ...prev,
          currentParticipants: next,
          isParticipated: true,
        });
      }

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
