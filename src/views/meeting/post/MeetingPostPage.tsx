'use client';

import { FormEvent, useState } from 'react';
import usePostMeetingMutation from '@/features/meeting/model/hook/usePostMeetingMutation';

export default function MeetingPostPage() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [content, setContent] = useState('');
  const { isPending, isError, error } = usePostMeetingMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      meetingTitle,
      location: { sido: '서울', address: '을지로 34-2', detail: '3층 카페' },
      participationFee: 30000,
      startAt: '2025-11-20T10:30:00',
      joinEndAt: '2025-09-20T23:59:00',
      maxParticipants: 5,
      minParticipants: 3,
      thumbnailUrl: 'https://example.com/image.jpg',
      content,
      tastingList: [
        {
          drinkId: 1,
          drinkName: '보르도 카르베네소비뇽',
          drinkImgUrl: 'https://example.com/drink.jpg',
          drinkType: 'WINE',
        },
      ],
    };
    console.log('Form Data:', formData);
  };

  if (isPending) return 'Loading...';
  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <>
      {isPending && <div>생성 중...</div>}
      {isError && <div>에러: {error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          placeholder="제목"
        />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" />
        <button type="submit">모임 생성</button>
      </form>
    </>
  );
}
