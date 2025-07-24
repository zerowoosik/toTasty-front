import Image from 'next/image';
import { Progress } from '@/shared/ui/Progress';
import { MeetingCardInfo } from '../model/types';

interface MeetingCardInfoProps {
  meetingInfo: MeetingCardInfo;
}

function formatDateToKorean(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('ko-KR', options);
}

export default function FindMeetingCard({ meetingInfo }: MeetingCardInfoProps) {
  const meetingStartDate = formatDateToKorean(meetingInfo.startAt);
  return (
    <div
      key={meetingInfo.meetingId.toString() || 'card'}
      className="relative w-[228px] h-[290px] border-1 border-gray-020 rounded-sm overflow-hidden"
    >
      <div className="relative w-[228px] h-[163px]">
        <Image
          src="/assets/image/card-test-1.png"
          alt="Meeting Card Test Image"
          width={228}
          height={163}
          className="w-full h-auto object-cover"
        />
        <div className="absolute w-[50px] h-[20px] bg-gray-900 bg-opacity-70 flex items-center justify-center left-3 bottom-[9px] rounded-[4px]">
          <span className="text-white text-xs font-bold">개설확정</span>
        </div>
        <div className="absolute w-[20.5px] h-[20.5px] flex items-center justify-center right-3.5 top-3.5">
          <Image src="/assets/icons/heart.svg" alt="wish meeting" width={18.83} height={17.13} />
        </div>
      </div>

      <div className="flex ml-3 mt-3 items-center justify-between">
        <span className="text-xs font-normal">
          {meetingInfo.location.address.replace(meetingInfo.location.sido, '')}
        </span>
        <div className="flex items-center">
          <div className="flex w-[60px] h-[20px] border rounded-xs mr-1 justify-center items-center">
            <span className="text-xs font-medium text-gray-050">시음리스트</span>
          </div>
          <span className="text-xs font-bold mr-2">5개</span>
          {/* TODO: 시음리스트 API에 필드 추가 해서 받아와야함 */}
        </div>
      </div>
      <div className="flex mt-[1px] ml-3 text-sm font-bold items-center">
        {meetingInfo.meetingTitle}
      </div>
      <div className="flex justify-end mt-0.5 px-2">
        <span className="text-xs font-normal text-primary-040">
          {meetingInfo.currentParticipants}
        </span>
        <span className="text-xs font-normal text-gray-030">/</span>
        <span className="text-xs font-normal text-gray-040">{meetingInfo.maxParticipants}명</span>
      </div>
      <div className="flex items-center pl-[12px] pr-[8px] mt-1">
        <Progress value={(meetingInfo.currentParticipants / meetingInfo.maxParticipants) * 100} />
      </div>
      <span className="text-gray-040 ml-3 mt-1 text-xs font-normal">{meetingStartDate} 출발</span>
      <div className="flex text-gray-090 text-sm font-bold justify-end px-2">
        {meetingInfo.participationFee.toLocaleString('ko-KR')}원
      </div>
    </div>
  );
}
