import { TastingInfo } from '@/shared';
import clsx from 'clsx';
import ReviewImgCard from './ReviewImgCard';

export default function ReviewImgCardRow({
  tastingInfo,
  className,
}: {
  tastingInfo?: TastingInfo[];
  className?: string;
}) {
  const tastingListRender = () => {
    const imageCards = tastingInfo?.map((item) => (
      <ReviewImgCard key={`reviewImgCard${item.drinkId}`} item={item} />
    ));
    return [imageCards];
  };

  return (
    <div>
      <span className={clsx(className, 'text-sm font-medium text-foreground')}>시음 리스트</span>
      <div className="flex items-center gap-8 mt-4"> {tastingListRender()}</div>
    </div>
  );
}
