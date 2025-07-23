import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import meetingKeys from '@/entities/meetings/model/meeting.keys';
import postMeeting from '../../api/postMeeting';
import { PostMeetingRequest, PostMeetingSucceed } from '../types';

export default function usePostMeetingMutation(): UseMutationResult<
  PostMeetingSucceed | null,
  Error,
  PostMeetingRequest,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostMeetingRequest) => postMeeting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.all.queryKey });
    },
  });
}
