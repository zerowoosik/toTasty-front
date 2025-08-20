import { formOptions } from '@tanstack/react-form';
import { DrinkType, LocationInfo, TastingInfo } from '@/shared';
import PostMeetingFormData from './types';

const defaultValues: PostMeetingFormData = {
  meetingTitle: '',
  location: {
    sido: '',
    address: '',
    detail: '',
  } as LocationInfo,
  participationFee: 0,
  startAt: '',
  joinEndAt: '',
  maxParticipants: 0,
  minParticipants: 0,
  currentParticipants: 1,
  thumbnailUrl: '',
  drinkType: DrinkType.coffee,
  tastingList: [] as TastingInfo[],
  content: '',
};

export const postMeetingOptions = formOptions({
  defaultValues,
  // 우선 validators를 주석 처리하고 개별 필드 validation부터 테스트
  // validators: {
  //   onSubmit: postMeetingValidator,
  // },
});

export default postMeetingOptions;
