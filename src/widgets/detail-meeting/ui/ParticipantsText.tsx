'use client';

export default function ParticipantsText({
  current,
  max,
  className,
}: {
  current: number;
  max: number;
  className?: string;
}) {
  return (
    <span className={`text-sm hidden sm:block mr-2 ${className ?? ''}`}>
      {current}/{max}명 참여 중
    </span>
  );
}
