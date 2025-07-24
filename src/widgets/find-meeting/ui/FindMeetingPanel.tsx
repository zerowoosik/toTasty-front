import Image from 'next/image';

export default function FindMeetingPanel() {
  return (
    <div className="flex h-[72px] w-[328px] items-center gap-4">
      <Image src="/assets/icons/head.svg" alt="finding-meeting icon" width={72} height={72} />
      <div className="order-1 flex w-60 flex-none grow-0 flex-col items-start gap-2">
        <span className="h-5 w-[127px] flex-none grow-0 order-0 font-pretendard text-sm font-medium leading-5 text-gray-070">
          함께 할 사람이 없나요?
        </span>
        <h2 className="h-8 w-60 order-1 flex-none grow-0 font-pretendard text-2xl font-semibold leading-8 text-gray-090">
          지금 모임에 참여해보세요
        </h2>
      </div>
    </div>
  );
}
