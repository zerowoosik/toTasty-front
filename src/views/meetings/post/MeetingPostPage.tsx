'use client';

import { usePostMeetingMutation } from '@/features/meetings';
import { PostMeetingRequest } from '@/features/meetings/model/types';
import { PostMeetingForm } from '@/widgets';
import { useRouter } from 'next/navigation';

export default function MeetingPostPage() {
  const router = useRouter();
  const { mutateAsync } = usePostMeetingMutation();
  const handleSubmit = async (formData: PostMeetingRequest) => {
    try {
      const result = await mutateAsync(formData);
      if (result && result.meetingId) {
        alert('모임이 성공적으로 생성되었습니다!');
        router.push(`/meetings/${result.meetingId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center my-15">모임 생성</h2>
      {/* {isPending && <div>생성 중...</div>}
      {isError && <div>에러: {error.message}</div>} */}

      <div className="max-w-3xl mx-auto">
        <PostMeetingForm callbackSubmit={handleSubmit} />
      </div>
    </>
  );
}
