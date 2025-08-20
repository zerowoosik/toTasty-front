import { z } from 'zod';
import { DrinkType } from '@/shared';

export const drinkTypeSchema = z.nativeEnum(DrinkType, {
  message: '주류 종류를 선택해주세요',
});

export const meetingTitleSchema = z
  .string()
  .min(1, '모임 제목을 입력해주세요')
  .min(3, '모임 제목은 최소 3글자 이상이어야 합니다')
  .max(50, '모임 제목은 50글자를 초과할 수 없습니다');

const isValidImageUrl = (value: string) => value !== '' && value.length > 0;

export const ImageUrlSchema = (type: string) =>
  z.string().refine(isValidImageUrl, { message: `${type} 이미지를 첨부해주세요` });

export const locationSchema = z
  .object({
    sido: z.string(),
    address: z.string().refine((val) => val.length > 0, {
      message: '장소를 선택해주세요',
    }),
    detail: z.string(),
  })
  .refine(
    (data) => {
      return data.address.length === 0 || data.detail.length > 0;
    },
    {
      message: '상세 주소를 입력해주세요',
      path: ['detail'],
    },
  );

export const meetingDateSchema = z
  .object({
    joinEndAt: z.string(),
    startAt: z.string(),
  })
  .refine(
    (data) => {
      if (!data.joinEndAt || !data.startAt) return true;

      const joinEndDate = new Date(data.joinEndAt);
      const startDate = new Date(data.startAt);

      return joinEndDate < startDate;
    },
    {
      message: '모집 마감일은 모임 날짜보다 이전이어야 합니다',
      path: ['joinEndAt'],
    },
  );

const dateInFutureSchema = (type: string) =>
  z
    .string()
    .min(1, `${type}를 선택해주세요`)
    .refine((dateStr) => {
      if (!dateStr) return true;

      const date = new Date(dateStr);
      const now = new Date();
      return date > now;
    }, '현재 시간 이후로 설정해주세요');

export const startAtSchema = dateInFutureSchema('모임 날짜');
export const joinEndAtSchema = dateInFutureSchema('모집 마감일자');

export const minParticipantsSchema = z
  .number()
  .min(2, '최소 참가자는 2명 이상이어야 합니다')
  .max(99, '최소 참가자는 99명을 초과할 수 없습니다');

export const maxParticipantsSchema = z
  .number()
  .min(2, '최대 참가자는 2명 이상이어야 합니다')
  .max(100, '최대 참가자는 100명을 초과할 수 없습니다');

export const participationFeeSchema = z
  .number()
  .min(0, '참가비는 0원 이상이어야 합니다')
  .max(1000000, '참가비는 100만원을 초과할 수 없습니다');

export const contentSchema = z
  .string()
  .min(10, '설명은 최소 10글자 이상 작성해주세요')
  .max(2000, '설명은 2000글자를 초과할 수 없습니다');

export const tastingListSchema = z
  .array(z.any())
  .min(1, '시음 리스트를 1개 이상 추가해주세요')
  .max(7, '시음 리스트는 7개 이하로 추가해주세요');

export const drinkNameSchema = (isAddable: boolean) =>
  z.string().refine((val) => isAddable && val.length > 0, {
    message: isAddable ? '음료명을 입력해주세요' : '삭제해주세요',
  });

export const drinkImgUrlSchema = (isAddable: boolean) =>
  z.string().refine((value) => isAddable && isValidImageUrl(value), {
    message: isAddable ? '음료 이미지를 첨부해주세요' : '',
  });
