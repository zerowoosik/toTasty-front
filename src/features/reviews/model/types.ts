import { TastingInfo } from '@/entities/tasting-list/model/types';

export interface PostReviewInfo {
  meetingId: number;
  reviewRating: number;
  reviewContent: string;
  tastingList: TastingInfo[];
}

export interface ReviewSucceedInfo {
  reviewId: number;
}
