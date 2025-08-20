'use client';

import { useMemo, useRef } from 'react';
import { useUserStore } from '@/entities/user';
import { useStickyFooter, useNowTick } from './model/hook';
import { ActionButtons, FooterText, ParticipantsText } from './ui';
import { MeetingFooterProps, FooterCtx, Role, MeetingStatus } from './model/types';

const cx = (...v: (string | false | undefined)[]) => v.filter(Boolean).join(' ');

export default function MeetingDetailFooter(props: MeetingFooterProps) {
  const { meeting, role: roleProp, isHost, handlers } = props;
  const { isLoggedIn } = useUserStore((s) => s);
  const { isMobile, isFixed } = useStickyFooter();
  const containerRef = useRef<HTMLDivElement>(null);
  const role: Role = isHost ? Role.host : (roleProp ?? (isLoggedIn ? Role.member : Role.guest));

  useNowTick(30_000);

  const ctx: FooterCtx = useMemo(
    () => ({
      role,
      status: meeting.status as MeetingStatus,
      current: meeting.currentParticipants,
      max: meeting.maxParticipants,
      fee: meeting.participationFee,
      isParticipated: meeting.isParticipated,
      isReviewed: meeting.isReviewed ?? false,
      joinEndAt: meeting.joinEndAt,
      startAt: meeting.startAt,
    }),
    [
      role,
      meeting.status,
      meeting.currentParticipants,
      meeting.maxParticipants,
      meeting.participationFee,
      meeting.isParticipated,
      meeting.isReviewed,
      meeting.joinEndAt,
      meeting.startAt,
    ],
  );

  let containerClass = 'relative mt-20';
  if (isMobile) containerClass = 'relative mt-8';
  else if (isFixed) containerClass = 'fixed bottom-0 left-0';

  return (
    <>
      {!isMobile && isFixed && <div className="h-32" />}

      <div
        ref={containerRef}
        className={cx('border-t border-muted bg-background z-10 w-full py-3 px-4', containerClass)}
      >
        <div className="max-w-[1000px] m-auto flex items-center justify-between">
          <FooterText fee={meeting.participationFee} />

          <div className="flex items-center gap-2">
            <ParticipantsText current={meeting.currentParticipants} max={meeting.maxParticipants} />
            <ActionButtons ctx={ctx} handlers={handlers} />
          </div>
        </div>
      </div>
    </>
  );
}
