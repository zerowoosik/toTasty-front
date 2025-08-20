import MeetingDetailPage from '@/views/meetings/detail/MeetingDetailPage';

type PageProps = {
  params: Promise<{ meetingId: string }>;
};

export default async function MeetingDetailRoute({ params }: PageProps) {
  const { meetingId } = await params;
  return <MeetingDetailPage meetingId={Number(meetingId)} />;
}
