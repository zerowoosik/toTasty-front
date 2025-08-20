'use client';

import { DrinkType } from '@/shared';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import { FindMeetingCard } from '@/widgets/index';

type FindMeetingCardProps = Parameters<typeof FindMeetingCard>[0];
type MeetingInfo = FindMeetingCardProps['meetingInfo'];

const BASE_DUMMY: MeetingInfo = {
  meetingId: -1,
  meetingAuthor: 'ToTasty',
  meetingTitle: '샘플 테이스팅',
  location: { sido: '서울특별시', address: '용산구 한강대로 405', detail: '샘플 장소' },
  participationFee: 30000,
  startAt: '2025-12-31T10:30:00',
  joinEndAt: '2025-12-30T23:59:00',
  maxParticipants: 10,
  minParticipants: 3,
  currentParticipants: 1,
  tastingDrinkCount: 1,
  isWished: false,
  thumbnailUrl: '/assets/image/card-test-1.png',
  status: 'open',
  drinkType: DrinkType.wine,
  isReviewed: false,
  participation: [],
};

const DUMMY_LIST: MeetingInfo[] = Array.from({ length: 4 }, (_, i) => ({
  ...BASE_DUMMY,
  meetingId: -(i + 1),
}));

export default function DummyCardArea() {
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

      <CarouselContent className="flex gap-[30px] pointer-events-none" aria-hidden="true">
        {DUMMY_LIST.map((card) => (
          <CarouselItem key={card.meetingId} className="flex-shrink-0 basis-[263px]">
            <FindMeetingCard meetingInfo={card} size="big" />
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
