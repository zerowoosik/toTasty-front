'use client';

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import Image from 'next/image';
import { TastingInfo, useAppForm } from '@/shared';
import { usePostReviewMutation } from '@/features/reviews';
import { useRouter } from 'next/navigation';
import { useMeetingDetailQuery } from '@/entities/meetings';
import ReviewImgCardRow from '../ui/ReviewImgCardRow';
import { contentSchema, tastingSchema, flavorSchema, colorSchema } from './model/validationSchema';

export default function PostReview({
  tastingList,
  meetingId,
}: {
  tastingList: TastingInfo[];
  meetingId: number;
}) {
  const router = useRouter();
  const { mutateAsync } = usePostReviewMutation();
  const { isPending, data } = useMeetingDetailQuery(meetingId);

  const form = useAppForm({
    defaultValues: {
      meetingId,
      reviewRating: 1,
      reviewContent: '',
      tastingList,
    },
    validators: {},
    onSubmit: async ({ value }) => {
      const result = await mutateAsync(value);
      if (result && result.reviewId) {
        alert('리뷰 작성을 완료하였습니다.');
        router.push(`/reviews/${result.reviewId}`);
      }
    },
  });

  if (isPending) return <div />;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-center min-h-12 text-foreground text-3xl font-bold mt-16 rounded-xl">
        {data?.meetingTitle}
      </div>
      <form
        method="post"
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField name="reviewRating">{(field) => <field.RatingField />}</form.AppField>

        <form.AppField
          name="reviewContent"
          validators={{
            onChange: contentSchema,
          }}
        >
          {(field) => (
            <field.TextareaField
              label="총평"
              placeholder="모임에 대한 설명, 음료에 대한 설명을 작성해주세요."
              maxLength={2000}
              required
              AreaClassName="min-h-[153px]"
            />
          )}
        </form.AppField>

        <ReviewImgCardRow tastingInfo={tastingList} />

        <form.AppField name="tastingList" mode="array">
          {(field) => (
            <Carousel
              className="w-full overflow-visible"
              opts={{ loop: false, align: 'start', containScroll: 'trimSnaps' }}
              orientation="horizontal"
            >
              <CarouselPrevious
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 transition-shadow duration-300 hover:shadow-md"
                style={{ pointerEvents: 'auto' }}
              />
              <CarouselContent className="flex">
                {field.state.value?.map((item, index) => {
                  const carKey = `carouselItem-${item.drinkId}`;
                  return (
                    <CarouselItem key={carKey}>
                      <div className="text-xl font-bold text-foreground mt-14 ml-4">
                        {item.drinkName}
                      </div>
                      <div className="w-full flex justify-center gap-6 mt-4">
                        <div className="relative w-[471px] h-[496px] border-2 rounded-2xl">
                          <Image
                            src={item.drinkImgUrl ?? ''}
                            alt="test"
                            className="w-[471px] h-[496px] rounded-2xl"
                            fill
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <div className="w-[491px] flex flex-col">
                          <form.AppField
                            name={`tastingList[${index}].drinkTaste`}
                            validators={{
                              onChange: tastingSchema,
                            }}
                          >
                            {(subField) => (
                              <subField.TextareaField
                                label="맛"
                                placeholder="해당 음료의 맛에 대해서 작성해주세요."
                                maxLength={500}
                                required
                                AreaClassName="min-h-[100px]"
                              />
                            )}
                          </form.AppField>
                          <form.AppField
                            name={`tastingList[${index}].drinkFlavor`}
                            validators={{
                              onChange: flavorSchema,
                            }}
                          >
                            {(subField) => (
                              <subField.TextareaField
                                label="향"
                                placeholder="해당 음료의 향에 대해서 작성해주세요."
                                maxLength={500}
                                required
                                AreaClassName="min-h-[100px]"
                              />
                            )}
                          </form.AppField>
                          <form.AppField
                            name={`tastingList[${index}].drinkColor`}
                            validators={{
                              onChange: colorSchema,
                            }}
                          >
                            {(subField) => (
                              <subField.TextareaField
                                label="색"
                                placeholder="해당 음료의 색에 대해서 작성해주세요."
                                maxLength={500}
                                required
                                AreaClassName="min-h-[100px]"
                              />
                            )}
                          </form.AppField>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselNext
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 transition-shadow duration-300 hover:shadow-md"
                style={{ pointerEvents: 'auto' }}
              />
            </Carousel>
          )}
        </form.AppField>

        <div className="flex justify-center mt-8 gap-3">
          <Button type="button" size="lg" variant="outlinePrimary">
            취소하기
          </Button>
          <Button type="submit" size="lg" className="px-8">
            완료하기
          </Button>
        </div>
      </form>
    </div>
  );
}
