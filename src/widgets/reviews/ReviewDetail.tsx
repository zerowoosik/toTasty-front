'use client';

import Image from 'next/image';
import { Label } from '@/shared';
import { ReviewDetailInfo } from '@/entities/reviews';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import clsx from 'clsx';
import { useMeetingDetailQuery } from '@/entities/meetings';
import ReviewImgCardRow from './ui/ReviewImgCardRow';

export default function ReviewDetail({ reviewDetailInfo }: { reviewDetailInfo: ReviewDetailInfo }) {
  const ratingPointsHeartRender = () => {
    const result = [];
    for (let i = 1; i <= 5; i += 1) {
      const isChecked = i <= reviewDetailInfo.reviewRating;
      result.push(
        <div key={`rating${i}`} className="w-8 h-8 flex items-center justify-center">
          <Image
            src={
              isChecked
                ? '/assets/icons/heart-point-checked.svg'
                : '/assets/icons/heart-point-unchecked.svg'
            }
            alt="check wish point"
            width={26.8}
            height={23.3}
          />
        </div>,
      );
    }
    return result;
  };

  const { isPending, data } = useMeetingDetailQuery(reviewDetailInfo.meetingId);

  const divStyle =
    'flex w-full rounded-md border border-gray-300 bg-secondary px-3 py-2 text-base shadow-xs transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-3';

  if (isPending) return <div />;

  return (
    <div className="mb-10 space-y-2">
      <div className="flex items-center justify-center min-h-12 text-foreground text-3xl font-bold mt-16 rounded-xl">
        {data?.meetingTitle}
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground mt-14">만족스러운 경험이었나요?</div>
        <div className="flex items-center mr-0.5 mt-3">{ratingPointsHeartRender()}</div>
        <span className="block mb-5" />
      </div>

      <div className="">
        <Label>총평</Label>
        <div className={clsx(divStyle, 'min-h-[153px]')}>{reviewDetailInfo.reviewContent}</div>
        <span className="block mb-5" />
      </div>

      <ReviewImgCardRow tastingInfo={reviewDetailInfo.tastingList} />

      <Carousel
        className="w-full overflow-visible"
        opts={{ loop: false, align: 'start', containScroll: 'trimSnaps' }}
        orientation="horizontal"
      >
        <CarouselPrevious
          className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 transition-shadow duration-300 hover:shadow-md"
          style={{ pointerEvents: 'auto' }}
        />
        <CarouselContent className="flex">
          {reviewDetailInfo.tastingList.map((item) => {
            const carKey = `carouselItem-${item.drinkId}`;
            return (
              <CarouselItem key={carKey}>
                <div className="text-xl font-bold text-foreground mt-14 ml-4">{item.drinkName}</div>
                <div className="w-full flex justify-center gap-6 mt-4">
                  <div className="relative w-[471px] h-[496px] border-2 rounded-2xl overflow-hidden">
                    <Image
                      src={item.drinkImgUrl ?? item.drinkImageUrl ?? ''}
                      alt="test"
                      style={{
                        objectFit: 'cover',
                      }}
                      fill
                      className="w-[471px] h-[496px] rounded-2xl"
                    />
                  </div>
                  <div className="w-[491px] flex flex-col">
                    <div className="space-y-2">
                      <Label>맛</Label>
                      <div className={clsx(divStyle, 'min-h-[100px]')}>{item.drinkTaste}</div>
                      <span className="block mb-5" />
                    </div>
                    <div className="space-y-2">
                      <Label>향</Label>
                      <div className={clsx(divStyle, 'min-h-[100px]')}>{item.drinkFlavor}</div>
                      <span className="block mb-5" />
                    </div>
                    <div className="space-y-2">
                      <Label>색</Label>
                      <div className={clsx(divStyle, 'min-h-[100px]')}>{item.drinkColor}</div>
                      <span className="block mb-5" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselNext
          className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 transition-shadow duration-300 hover:shadow-md"
          style={{ pointerEvents: 'auto' }}
        />
      </Carousel>
    </div>
  );
}
