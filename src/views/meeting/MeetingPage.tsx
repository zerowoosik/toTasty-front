'use client';

import { useMeetingListQuery } from '@/entities/meetings';
// import { DrinkType } from '@/entities/meetings/model/types';

export default function MeetingPage() {
  const { data: meetings, isLoading } = useMeetingListQuery({
    // filter: '서울',
    // sort: 'latest',
    // drinkType: DrinkType.wine,
  });

  if (isLoading) return <div>로딩중...!!!</div>;

  const isMeetings = meetings && meetings.length > 0;

  return (
    <div>
      <h1>Meeting List Page</h1>
      {isMeetings ? (
        meetings.map((meeting) => <div key={meeting.meetingId}>{meeting.meetingTitle}</div>)
      ) : (
        <div>모임이 없습니다.</div>
      )}
    </div>
  );
}
