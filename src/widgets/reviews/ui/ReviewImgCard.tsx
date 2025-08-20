import Image from 'next/image';
import { TastingInfo } from '@/shared';

interface ReviewImgProps {
  item: TastingInfo;
}

export default function ReviewImgCard({ item }: ReviewImgProps) {
  return (
    <div className="w-[114px] h-[184px]">
      <div className="relative w-[114px] h-[148px] border-1 border-muted rounded-xl">
        <Image
          src={item.drinkImgUrl ?? item.drinkImageUrl ?? ''}
          alt={item.drinkName ?? ''}
          fill
          style={{ objectFit: 'fill' }}
          className="rounded-xl"
        />
      </div>
      <span className="block text-sm font-medium text-secondary-foreground mt-3 text-center overflow-hidden whitespace-nowrap truncate">
        {item.drinkName}
      </span>
    </div>
  );
}
