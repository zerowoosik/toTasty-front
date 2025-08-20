import { TastingInfo } from '@/shared';

export interface ReviewContent {
  reviewId: number;
  memberId: number;
  memberNickname: string;
  memberProfileImageUrl: string;
  meetingId: number;
  meetingTitle: string;
  thumbnailUrl: string;
  reviewDate: string;
  reviewRating: number;
  reviewContent: string;
}

interface PageInfo {
  totalPages: number;
  totalElements: number;
  hasNextPage: boolean;
}

export interface ReviewDetailInfo {
  meetingId: number;
  reviewRating: number;
  reviewContent: string;
  tastingList: TastingInfo[];
}

export interface ReviewList {
  reviews: ReviewContent[];
  pageInfo: PageInfo;
}

export interface ReviewFilters {
  page: number;
  size: number;
  meetingId?: number;
}

export interface MeetingReviewFilters {
  meetingId: number;
  currentPage: number;
  size: number;
}
