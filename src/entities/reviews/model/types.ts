import { TastingInfo } from '@/entities/tasting-list/model/types';

interface ReviewContent {
  reviewId: number;
  reviewRating: number;
  reviewContent: string;
  reviewer: string;
  reviewerImgUrl: string;
}

interface PageInfo {
  totalPages: number;
  totalElements: number;
  hasNextPage: boolean;
}

export enum PageFlag {
  MYREIVEWS,
  MEETINGDETAIL,
}

export interface ReviewDetailInfo {
  meetingId: number;
  reviewRating: number;
  reviewContent: string;
  tastingList: TastingInfo[];
}
export interface ReviewList {
  contents: ReviewContent[];
  pageInfo: PageInfo;
}

export interface ReviewFilters {
  page: number;
  size: number;
  pageFlag: number;
  meetingId?: number;
}
