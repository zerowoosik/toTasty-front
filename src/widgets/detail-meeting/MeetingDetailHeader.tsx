import Image from 'next/image';
import { CheckCircle, ClockAlert } from 'lucide-react';
import { Badge, Progress } from '@/shared/ui';
import { getDeadlineText, getFormattedDate, getFormattedTime } from '@/shared/lib/date';
import { MeetingDetailInfo } from '@/entities/meetings/model/types';
import { WithIcon, WishButton } from './ui';

export default function MeetingDetailHeader(data: MeetingDetailInfo) {
  const {
    meetingId,
    meetingTitle,
    currentParticipants,
    thumbnailUrl,
    startAt,
    joinEndAt,
    maxParticipants,
    minParticipants,
    isWished,
    location,
  } = data;

  const progressPercentage = (currentParticipants / maxParticipants) * 100;
  const isClosed = currentParticipants >= minParticipants;
  const { isToday, message: DeadlineMessage } = getDeadlineText(joinEndAt);

  const style = {
    card: 'lg:flex-1 border border-muted rounded-3xl overflow-hidden',
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className={`relative ${style.card} min-h-[200px] md:min-h-[250px]`}>
        <Image
          src={thumbnailUrl}
          alt={meetingTitle}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 484px"
        />
        {isToday && (
          <WithIcon
            Icon={ClockAlert}
            text={DeadlineMessage}
            className="absolute top-0 right-0 sub-gradient text-white px-4 py-1 rounded-bl-3xl text-sm font-medium"
          />
        )}
      </div>
      <div className={style.card}>
        <div className="p-6 pb-8">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 mr-4">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground leading-tight">
                {meetingTitle}
              </h1>
              <p className="text-secondary-foreground mt-2 text-sm lg:text-base">
                {location.address} {location.detail}
              </p>
            </div>
            <WishButton isWished={isWished} meetingId={Number(meetingId)} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="tertiary">{getFormattedDate(startAt)}</Badge>
            <Badge variant="tertiary" className="text-primary-030 dark:text-primary-060">
              {getFormattedTime(startAt)}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm p-6 pt-8 border-dashed border-t-1 border-muted">
          <div className="flex items-center justify-between">
            <span>현재 인원 {currentParticipants}명</span>
            <div className="flex items-center gap-2">
              {isClosed ? (
                <WithIcon
                  Icon={CheckCircle}
                  text="개설 확정"
                  className="text-primary flex items-center"
                />
              ) : (
                <span className="text-secondary-foreground">개설 대기중</span>
              )}
            </div>
          </div>
          <Progress value={progressPercentage} />

          <div className="flex items-center gap-4 justify-between">
            <span>최소인원 {minParticipants}명</span>
            <span>최대인원 {maxParticipants}명</span>
          </div>
        </div>
      </div>
    </div>
  );
}
