'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { useAppForm } from '@/shared/lib';
import { DrinkType, TastingInfo } from '@/shared';
import { useUploadImageMutation } from '@/features/upload-image';
import { PostMeetingRequest } from '@/features/meetings/model/types';
import ErrorField from '@/shared/ui/form/ErrorField';
import { postMeetingOptions } from './model/postMeetingOptions';
import {
  meetingTitleSchema,
  ImageUrlSchema,
  participationFeeSchema,
  maxParticipantsSchema,
  minParticipantsSchema,
  drinkTypeSchema,
  contentSchema,
  locationSchema,
  startAtSchema,
  joinEndAtSchema,
  meetingDateSchema,
  tastingListSchema,
  drinkNameSchema,
  drinkImgUrlSchema,
} from './model/validationSchema';

interface PostMeetingViewProps {
  callbackSubmit: (data: PostMeetingRequest) => Promise<void>;
}

export default function PostMeetingView({ callbackSubmit }: PostMeetingViewProps) {
  const router = useRouter();
  const form = useAppForm({
    ...postMeetingOptions,
    validators: {},
    onSubmit: ({ value }) => {
      try {
        meetingDateSchema.parse({
          startAt: value.startAt,
          joinEndAt: value.joinEndAt,
        });

        const updatedTastingList = value.tastingList.map((item) => ({
          ...item,
          drinkType: value.drinkType,
        }));

        const requestData = {
          ...value,
          tastingList: updatedTastingList,
        };

        callbackSubmit(requestData);
      } catch (error) {
        alert(JSON.parse(error as string)[0].message);
      }
    },
  });

  const uploadMutation = useUploadImageMutation();

  const drinkTypeOptions = Object.values(DrinkType).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));

  return (
    <form
      method="post"
      className="flex flex-col gap-4 py-8"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex gap-4">
        <form.AppField
          name="drinkType"
          validators={{
            onChange: drinkTypeSchema,
          }}
        >
          {(field) => (
            <field.SelectField
              label="시음회 종류"
              options={drinkTypeOptions.filter((option) => option.value !== DrinkType.end)}
              placeholder="음료 종류를 선택하세요"
              className="flex-1"
              required
            />
          )}
        </form.AppField>

        <form.AppField
          name="meetingTitle"
          validators={{
            onChange: meetingTitleSchema,
          }}
        >
          {(field) => (
            <field.TextField
              label="모임 이름"
              inputType="text"
              placeholder="모임 이름을 작성해주세요"
              className="flex-2"
              maxLength={50}
              required
            />
          )}
        </form.AppField>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <form.AppField
            name="participationFee"
            validators={{
              onChange: participationFeeSchema,
            }}
          >
            {(field) => (
              <field.NumberField
                label="참가 비용"
                placeholder="참가비를 입력하세요"
                min={0}
                max={1000000}
                step={1}
                className="w-full"
                useComma
              />
            )}
          </form.AppField>
          <span className="text-secondary-foreground mt-1 absolute right-3 top-7">원</span>
        </div>

        <form.AppField
          name="thumbnailUrl"
          validators={{
            onChange: ImageUrlSchema('대표'),
          }}
        >
          {(field) => (
            <field.FileUploadField
              label="대표 이미지"
              placeholder="대표 이미지를 첨부해주세요."
              uploadFile={uploadMutation.mutateAsync}
              hasUploadError={uploadMutation.isError}
              className="flex-2"
              required
            />
          )}
        </form.AppField>
      </div>

      <form.AppField
        name="location"
        validators={{
          onChange: locationSchema,
        }}
      >
        {(field) => (
          <field.AddressField
            label="장소"
            placeholder="장소를 입력해주세요"
            className="w-full"
            required
          />
        )}
      </form.AppField>

      <div className="flex gap-4">
        <form.AppField
          name="joinEndAt"
          validators={{
            onChange: joinEndAtSchema,
          }}
        >
          {(field) => (
            <field.DateTimeField
              label="모집 마감일"
              placeholder="마감 날짜와 시간을 선택하세요"
              className="flex-1"
              required
            />
          )}
        </form.AppField>

        <form.AppField
          name="startAt"
          validators={{
            onChange: startAtSchema,
          }}
        >
          {(field) => (
            <field.DateTimeField
              label="모임 날짜"
              placeholder="모임 날짜와 시간을 선택하세요"
              className="flex-1"
              required
            />
          )}
        </form.AppField>
      </div>

      <div className="flex gap-4 w-full">
        <form.AppField
          name="minParticipants"
          validators={{
            onChange: minParticipantsSchema,
          }}
        >
          {(field) => (
            <field.NumberField
              label="최소 모임 정원"
              placeholder="모임이 생성될 수 있는 최소 인원을 작성해주세요"
              className="flex-1"
              min={2}
              step={1}
            />
          )}
        </form.AppField>

        <form.AppField
          name="maxParticipants"
          validators={{
            onChange: maxParticipantsSchema,
          }}
        >
          {(field) => (
            <field.NumberField
              label="최대 모임 정원"
              placeholder="최대 참가자 수"
              className="flex-1"
              min={2}
              step={1}
              required
            />
          )}
        </form.AppField>
      </div>

      <form.AppField
        name="tastingList"
        mode="array"
        validators={{
          onChange: tastingListSchema,
        }}
      >
        {(field) => (
          <div>
            <p className="text-sm leading-none font-medium select-none">
              시음 음료 목록<span className="text-danger ml-1">*</span>
            </p>
            <ErrorField fieldStateMeta={field.state.meta} />
            {field.state.value.map((_: TastingInfo, index: number) => {
              const itemKey = `tastingList-${index}`;
              const isAddable = index < 7;
              return (
                <div key={itemKey} className="flex gap-2">
                  <form.AppField
                    name={`tastingList[${index}].drinkName`}
                    validators={{
                      onChange: drinkNameSchema(isAddable),
                    }}
                  >
                    {(subField) => (
                      <subField.TextField
                        placeholder={
                          isAddable
                            ? '샤르도네 2025, 바닐라 라떼, 몽키숄더 등'
                            : '최대 7개까지만 가능합니다.'
                        }
                        className="flex-1"
                        disabled={!isAddable}
                      />
                    )}
                  </form.AppField>
                  <form.AppField
                    name={`tastingList[${index}].drinkImgUrl`}
                    validators={{
                      onChange: drinkImgUrlSchema(isAddable),
                    }}
                  >
                    {(subField) => (
                      <subField.FileUploadField
                        placeholder={isAddable ? '음료 이미지를 첨부해주세요' : '업로드 불가'}
                        className="flex-1"
                        uploadFile={uploadMutation.mutateAsync}
                        hasUploadError={uploadMutation.isError}
                        disabled={!isAddable}
                      />
                    )}
                  </form.AppField>
                  <Button
                    type="button"
                    variant="outlineDanger"
                    onClick={() => field.removeValue(index)}
                  >
                    삭제
                  </Button>
                </div>
              );
            })}
            <Button
              type="button"
              variant="ghost"
              onClick={() => field.pushValue({ drinkName: '', drinkImgUrl: '' })}
              className="cursor-pointer w-full"
            >
              <span className="border border-primary text-primary leading-[110%] rounded-full w-5 h-5 flex justify-center">
                +
              </span>
              시음 리스트 추가하기
            </Button>
          </div>
        )}
      </form.AppField>

      <form.AppField
        name="content"
        validators={{
          onChange: contentSchema,
        }}
      >
        {(field) => (
          <field.TextareaField
            label="상세 설명"
            placeholder="모임에 대한 설명을 입력하세요"
            maxLength={2000}
            required
          />
        )}
      </form.AppField>

      <div className="flex justify-center mt-4 gap-3">
        <Button type="button" size="lg" variant="outlinePrimary" onClick={() => router.back()}>
          작성 취소
        </Button>
        <Button type="submit" size="lg" className="px-8">
          모임 만들기
        </Button>
      </div>
    </form>
  );
}
