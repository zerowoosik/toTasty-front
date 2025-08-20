import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import { FindMeetingCard } from '@/widgets/index';
import useWishlistMeetingsQuery from '@/entities/homeMeetingCard/model/hooks/useWishlistQuery';
import Link from 'next/link';

export default function WishlistCardArea() {
  const { data, isLoading } = useWishlistMeetingsQuery();

  if (isLoading) return null;

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center text-center w-[1142px] h-[383px] bg-secondary text-secondary-foreground">
        아직 위시리스트가 없어요.
        <br />
        지금 바로 모임을 찜해보세요.
      </div>
    );
  }

  return (
    <Carousel
      className="relative w-[1142px] overflow-visible"
      opts={{ loop: false, align: 'start', containScroll: 'trimSnaps' }}
      orientation="horizontal"
    >
      <CarouselPrevious
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 transition-shadow duration-300 hover:shadow-md"
        style={{ pointerEvents: 'auto' }}
      />

      <CarouselContent className="flex gap-[30px] ">
        {data.map((item) => (
          <CarouselItem key={item.meetingId} className="flex-shrink-0 basis-[263px]">
            <Link href={`/meetings/${item.meetingId}`} key={item.meetingId}>
              <FindMeetingCard meetingInfo={item} size="big" />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 transition-shadow duration-300 hover:shadow-md"
        style={{ pointerEvents: 'auto' }}
      />
    </Carousel>
  );
}
