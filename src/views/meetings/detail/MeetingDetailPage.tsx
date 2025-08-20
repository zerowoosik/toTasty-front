'use client';

import { useRouter } from 'next/navigation';
import { useMeetingDetailQuery } from '@/entities/meetings';
import { MeetingDetailHeader, MeetingDetailFooter, ContentBox } from '@/widgets/detail-meeting';
import { Role } from '@/widgets/detail-meeting/model/types';
import { useUserStore } from '@/entities/user';
import { useConfirm } from '@/widgets/detail-meeting/model/hook';
import {
  useCancelMeetingMutation,
  useJoinMeetingMutation,
  useCancelJoinMutation,
} from '@/features/meetings';
import MeetingDetailReviews from '@/widgets/detail-meeting/MeetingDetailReviews';
import ReviewImgCardRow from '@/widgets/reviews/ui/ReviewImgCardRow';

export default function MeetingDetailPage({ meetingId }: { meetingId: number }) {
  const router = useRouter();
  const { data: meetingData, isLoading, error } = useMeetingDetailQuery(meetingId);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const user = useUserStore((s) => s.user);
  const { confirm, ConfirmDialog } = useConfirm();

  const joinMutation = useJoinMeetingMutation();
  const cancelJoinMutation = useCancelJoinMutation();
  const cancelMeetingMutation = useCancelMeetingMutation();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {(error as Error).message}</div>;
  if (!meetingData) return <div>모임 정보를 불러오는 중입니다...</div>;

  const displayName = user?.nickname ?? '';
  const isHost = Boolean(isLoggedIn && displayName && displayName === meetingData.meetingAuthor);

  let role: Role;
  if (isHost) role = Role.host;
  else if (isLoggedIn) role = Role.member;
  else role = Role.guest;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handlers = {
    onLogin: () => {
      router.push(`/login?redirect=/meetings/${meetingId}`);
    },
    onJoin: () => {
      joinMutation.mutate({ meetingId });
    },
    onCancelJoin: () => {
      cancelJoinMutation.mutate({ meetingId });
    },
    onWriteReview: () => {
      router.push(`/reviews/post/${meetingId}`);
    },
    onShare: () => {
      if (navigator.share) {
        navigator.share({ title: 'To tasty', url: currentUrl }).catch(() => {});
      } else {
        navigator.clipboard
          .writeText(currentUrl)
          .then(() => {
            // TODO: toast.success('링크가 복사되었습니다.');
          })
          .catch(() => {
            // TODO: toast.error('복사에 실패했습니다.');
          });
      }
    },
    onCancelMeeting: async () => {
      const ok = await confirm({
        title: '모임 취소',
        description: '정말로 모임을 취소하시겠습니까?',
        confirmText: '네, 취소합니다',
        cancelText: '아니요',
        destructive: true,
      });
      if (ok) {
        cancelMeetingMutation.mutate({ meetingId });
      }
    },
    onNoop: () => {},
  };

  return (
    <main className="max-w-[1000px] mx-auto py-8">
      <div className="mb-8">
        <MeetingDetailHeader {...meetingData} />
      </div>

      <div className="space-y-15">
        <ReviewImgCardRow
          tastingInfo={meetingData.tastingList}
          className="text-lg font-semibold mb-2"
        />

        <ContentBox title="모임 상세 설명">{meetingData.content}</ContentBox>

        <ContentBox title="이 모임에 대한 리뷰">
          <MeetingDetailReviews meetingId={meetingId} />
        </ContentBox>

        <MeetingDetailFooter
          meeting={meetingData}
          role={role}
          isHost={isHost}
          handlers={handlers}
        />
      </div>

      <ConfirmDialog />
    </main>
  );
}
