import Link from 'next/link';
import { WishlistCardInfo } from '@/entities/wishlist/model/types';
import FindMeetingCard from '../../find-meeting/ui/FindMeetingCard';

interface MeetingInfoList {
  wishlistCardList: WishlistCardInfo[] | null | undefined;
}

export default function WishlistCardRow({ wishlistCardList }: MeetingInfoList) {
  const displayList = wishlistCardList || [];

  if (displayList.length > 0) {
    return (
      <div className="flex flex-wrap w-full gap-4">
        {displayList.map((meetingInfo, index) => (
          <Link href={`/meetings/${meetingInfo.meetingId}`} key={meetingInfo.meetingId}>
            <FindMeetingCard
              key={meetingInfo.meetingId?.toString() || index}
              meetingInfo={meetingInfo}
              size="small"
            />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] w-full items-center justify-center">
      <p className="text-muted-foreground text-sm font-medium items-center justify-center">
        위시리스트가 비어 있어요.
      </p>
    </div>
  );
}
