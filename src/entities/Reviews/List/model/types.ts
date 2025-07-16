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

export interface ReviewList {
  contents: ReviewContent[];
  pageInfo: PageInfo;
}

export enum PageFlag {
  MYREIVEWS,
  MEETINGDETAIL,
}
