import PostReviewView from '@/views/reviews/post/PostReviewView';

export default async function PostReviewPage({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const { meetingId } = await params;
  return <PostReviewView meetingId={Number(meetingId)} />;
}
