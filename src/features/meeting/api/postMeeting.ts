import { postApi } from '@/shared/api/axiosApis';
import { PostMeetingRequest, PostMeetingSucceed } from '../model/types';

export default async function postMeeting(
  post: PostMeetingRequest,
): Promise<PostMeetingSucceed | null> {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  return postApi<PostMeetingSucceed>('/api/v1/meetings', post, headers);
}
