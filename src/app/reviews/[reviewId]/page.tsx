import ReviewView from '@/views/reviews/ReviewView';

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}) {
  const { reviewId } = await params;
  return <ReviewView reviewId={Number(reviewId)} />;
}
