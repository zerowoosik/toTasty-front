import { useMutation, useQueryClient } from '@tanstack/react-query';
import meetingKeys from '@/entities/meetings/model/meeting.keys';
import type { MeetingDetailInfo } from '@/entities/meetings/model/types';
import cancelJoin from '../../api/cancelJoin';
import type { CancelJoinRequest, CancelJoinResponse, MutationCtx } from '../types';

export default function useCancelJoinMutation() {
  const qc = useQueryClient();

  return useMutation<CancelJoinResponse, Error, CancelJoinRequest, MutationCtx>({
    mutationFn: cancelJoin,

    onMutate: async ({ meetingId }) => {
      const detailKey = meetingKeys.detail(meetingId).queryKey;
      await qc.cancelQueries({ queryKey: detailKey });

      const prev = qc.getQueryData<MeetingDetailInfo>(detailKey);
      if (prev) {
        const next = Math.max(prev.currentParticipants - 1, 0);
        qc.setQueryData<MeetingDetailInfo>(detailKey, {
          ...prev,
          currentParticipants: next,
          isParticipated: false,
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
