export interface FindFilterBtn {
  id: string;
  name: string;
  filter: string;
}

export interface MeetingCardInfo {
  meetingId: number; // 모임ID
  meetingAuthor: string; // 모임 주최자 닉네임
  meetingTitle: string; // 모임 제목
  location: {
    sido: string; // 시/도
    address: string; // 도로명 주소
    detail: string; // 상세 주소
  };
  participationFee: number; // 참가비
  startAt: Date; // 모임 날짜
  joinEndAt: Date; // 모집 마감일
  maxParticipants: number; // 최대 모집 인원
  minParticipants: number; // 최소 모집 인원
  currentParticipants: number; // 현재 모집된 인원
  isWished: boolean; // 사용자가 위시리스트에 추가했는지 여부
  thumbnailUrl: string; // 썸네일 url
  status: string; // 모임상태 open(모집중), closed(마감), canceled(취소)
  drinkType: string; // 음료 타입
}

export interface Region {
  regionCode: number;
  sido: string;
}
