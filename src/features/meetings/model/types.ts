import { MeetingDetailInfo } from '@/entities/meetings/model/types';
import { TastingInfo, LocationInfo } from '@/shared';
import { QueryKey } from '@tanstack/react-query';

export interface PostMeetingRequest {
  meetingTitle: string;
  location: LocationInfo;
  participationFee: number;
  startAt: string;
  joinEndAt: string;
  maxParticipants: number;
  minParticipants: number;
  thumbnailUrl: string;
  content: string;
  tastingList: TastingInfo[];
}
export interface PostMeetingSucceed {
  meetingId: number;
}

export interface MutationCtx {
  prev?: MeetingDetailInfo;
  detailKey: QueryKey;
}

export interface CancelMeetingRequest {
  meetingId: number;
}
export interface CancelMeetingResponse {
  meetingId: number;
  status: 'cancelled';
}

export interface JoinMeetingRequest {
  meetingId: number;
}
export interface JoinMeetingResponse {
  meetingId: number;
  currentParticipants: number;
  isParticipated: true;
}

export interface CancelJoinRequest {
  meetingId: number;
}
export interface CancelJoinResponse {
  meetingId: number;
  currentParticipants: number;
  isParticipated: false;
}
