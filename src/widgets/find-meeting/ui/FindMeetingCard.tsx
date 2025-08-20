import Image from 'next/image';
import { Badge, Progress } from '@/shared/ui';
import { MeetingCardInfo } from '@/entities/meetings/index';
import clsx from 'clsx';

interface MeetingCardInfoProps {
  meetingInfo: MeetingCardInfo;
  size?: 'big' | 'small';
}

export default function FindMeetingCard({ meetingInfo, size = 'small' }: MeetingCardInfoProps) {
  const flexItemCenter = 'flex items-center';
  const flexCenter = `${flexItemCenter} justify-center`;
  const flexEnd = 'flex justify-end';
  const textMuted = 'text-xs text-muted';

  const isBig = size === 'big';

  const cardWidth = isBig ? 'w-[263px]' : 'w-[228px]';
  const cardHeight = isBig ? 'h-[333px]' : 'h-[290px]';

  const imageDivWidth = isBig ? 'w-[263px]' : 'w-[228px]';
  const imageDivHeight = isBig ? 'h-[190px]' : 'h-[163px]';
  const imageSrc = isBig ? '/assets/icons/heart2.svg' : '/assets/icons/heart.svg';
  const imageHeartWidth = isBig ? 24 : 18.83;
  const imageHeartHeight = isBig ? 24 : 17.13;

  const heartIconDivWidthHeight = isBig ? 'w-[48px] h-[48px]' : 'w-[40px] h-[40px]';

  const tastingListButtonWidth = isBig ? 'w-[61px]' : 'w-[60px]';
  const tastingListButtonHeight = isBig ? 'h-[22px]' : 'h-[20px]';
  const tastingListButtonMarginRight = isBig ? 'mr-[3px]' : 'mr-1';
  const tastingListTextSize = isBig ? 'text-sm font-bold mr-3' : 'text-xs font-bold mr-2';

  const dateObj = new Date(meetingInfo.startAt);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const formattedStartAt = `${year}년 ${month}월 ${day}일`;

  return (
    <div
      key={meetingInfo.meetingId.toString() || 'card'}
      className={clsx(cardWidth, cardHeight, 'border border-gray-020 rounded-sm overflow-hidden')}
    >
      <div className={clsx('relative grid overflow-hidden', imageDivWidth, imageDivHeight)}>
        <Image
          src={meetingInfo.thumbnailUrl}
          alt="Meeting Card Test Image"
          // width={imageWidth}
          // height={imageHeight}
          fill
          style={{ objectFit: 'cover' }}
          className="col-start-1 row-start-1"
        />
        <Badge
          variant={meetingInfo.status === 'closed' ? 'tertiary' : 'default'}
          className="absolute bottom-3 left-3"
        >
          {meetingInfo.status === 'closed' ? '모임 종료' : '모집중'}
        </Badge>
        <div
          className={clsx(
            flexCenter,
            heartIconDivWidthHeight,
            'absolute top right justify-self-end',
          )}
        >
          {meetingInfo.isWished ? (
            <Image
              src={imageSrc}
              alt="wish meeting"
              width={imageHeartWidth}
              height={imageHeartHeight}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={clsx(flexItemCenter, 'justify-between ml-3', isBig ? 'mt-3' : 'mt-2.5')}>
        <span className={clsx('text-xs truncate text-ellipsis', isBig ? 'w-[120px]' : 'w-[105px]')}>
          {meetingInfo.location.address.replace(meetingInfo.location.sido, '')}
        </span>
        <div className={clsx(flexItemCenter)}>
          <div
            className={clsx(
              flexCenter,
              tastingListButtonWidth,
              tastingListButtonHeight,
              'border rounded-xs',
              tastingListButtonMarginRight,
            )}
          >
            <span className="text-xs font-medium text-muted-foreground">시음리스트</span>
          </div>
          <span className={tastingListTextSize}>{meetingInfo.tastingDrinkCount ?? 0}개</span>
        </div>
      </div>
      <div className={clsx(flexItemCenter, 'mt-[1px] ml-3 text-sm font-bold')}>
        {meetingInfo.meetingTitle}
      </div>
      <div className={clsx(flexEnd, 'mt-0.5', isBig ? 'px-3' : 'px-2')}>
        <span className="text-xs text-primary">{meetingInfo.currentParticipants}</span>
        <span className={clsx(textMuted)}>/</span>
        <span className={clsx(textMuted)}>{meetingInfo.maxParticipants}명</span>
      </div>
      <div className={clsx(flexItemCenter, 'mt-1 px-3')}>
        <Progress value={(meetingInfo.currentParticipants / meetingInfo.maxParticipants) * 100} />
      </div>
      <span className={clsx(textMuted, 'ml-3', isBig ? 'mt-1.5' : 'mt-1')}>
        {formattedStartAt} 예정
      </span>
      {meetingInfo.participationFee === 0 ? (
        <div className={clsx(flexEnd, 'text-sm font-bold', isBig ? 'px-3' : 'px-2')}>무료</div>
      ) : (
        <div className={clsx(flexEnd, 'text-sm font-bold', isBig ? 'px-3' : 'px-2')}>
          {meetingInfo.participationFee.toLocaleString('ko-KR')}원
        </div>
      )}
    </div>
  );
}
