import { DrinkType, LocationInfo, TastingInfo } from '@/shared';

export enum SortType {
  latest = 'LATEST',
  popularity = 'POPULARITY_WISH',
  costHigh = 'COST_HIGH',
  costLow = 'COST_LOW',
  closingSoon = 'CLOSING_SOON',
  closedRecent = 'CLOSED_RECENT',
}

export interface MeetingParticipant {
  memberId: number;
  nickname: string;
  profileImgUrl: string;
  isHost: boolean;
}

export interface MeetingCardInfo {
  meetingId: number;
  meetingAuthor: string;
  meetingTitle: string;
  location: LocationInfo;
  participationFee: number;
  startAt: string;
  joinEndAt: string;
  maxParticipants: number;
  minParticipants: number;
  currentParticipants: number;
  isWished: boolean;
  thumbnailUrl: string;
  status: 'open' | 'closed' | 'cancelled';
  isReviewed?: boolean;
  drinkType: DrinkType;
  participation?: MeetingParticipant[];
  tastingDrinkCount?: number;
}

export interface MeetingDetailInfo extends MeetingCardInfo {
  tastingList: TastingInfo[];
  content: string;
  isParticipated: boolean;
}

interface SliceInfo {
  currentPage: number;
  size: number;
  hasNext: boolean;
}

export interface MeetingListInfo {
  content: MeetingCardInfo[];
  sliceInfo: SliceInfo;
}

export interface MeetingFilters {
  filter?: string;
  sort?: SortType;
  drinkType?: DrinkType;
  memberId?: number;
  page?: number;
  size?: number;
}
