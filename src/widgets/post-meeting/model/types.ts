import { DrinkType, LocationInfo, TastingInfo } from '@/shared';

export default interface PostMeetingFormData {
  meetingTitle: string;
  location: LocationInfo;
  participationFee: number;
  startAt: string;
  joinEndAt: string;
  maxParticipants: number;
  minParticipants: number;
  currentParticipants: number;
  thumbnailUrl: string;
  drinkType: DrinkType;
  tastingList: TastingInfo[];
  content: string;
}
