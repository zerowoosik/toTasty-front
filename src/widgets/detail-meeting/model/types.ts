import { MeetingDetailInfo } from '@/entities/meetings/model/types';

export interface WishButtonProps {
  isWished: boolean;
  meetingId: number;
  onWishChange?: (newIsWished: boolean) => void;
}

export interface ContentBoxProps {
  title: string;
  children: React.ReactNode;
}

export enum MeetingStatus {
  open = 'open',
  closed = 'closed',
  cancelled = 'cancelled',
}

export enum Role {
  guest = 'guest',
  member = 'member',
  host = 'host',
}

export enum ButtonVariant {
  Default = 'default',
  Outline = 'outline',
}

export enum ActionId {
  Login = 'login',
  Join = 'join',
  CancelJoin = 'cancelJoin',
  WriteReview = 'writeReview',
  Share = 'share',
  CancelMeeting = 'cancelMeeting',
  DisabledFull = 'disabledFull',
  DisabledClosed = 'disabledClosed',
}

export interface FooterCtx {
  role: Role;
  status: MeetingStatus;
  current: number;
  max: number;
  fee: number;
  isParticipated: boolean;
  isReviewed?: boolean;
  joinEndAt: string;
  startAt: string;
}

export interface Handlers {
  onLogin: () => void;
  onJoin: () => void;
  onCancelJoin: () => void;
  onWriteReview: () => void;
  onShare: () => void;
  onCancelMeeting: () => void;
  onNoop?: () => void;
}

export interface ActionDef {
  id: ActionId;
  label: string;
  visibleIf: (ctx: FooterCtx) => boolean;
  disabled?: (ctx: FooterCtx) => boolean;
  variant?: ButtonVariant;
  handlerKey: keyof Handlers;
  order?: number;
}

export interface MeetingFooterProps {
  meeting: MeetingDetailInfo;
  role?: Role;
  isHost?: boolean;
  handlers: Handlers;
}
