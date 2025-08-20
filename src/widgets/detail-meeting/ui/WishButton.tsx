'use client';

import { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { usePostWishlistMutation, useDeleteWishlistMutation } from '@/features/wishlist';
import { useUserStore } from '@/entities/user';
import { WishButtonProps } from '../model/types';

export default function WishButton({
  isWished: initialWished,
  meetingId,
  onWishChange,
}: WishButtonProps) {
  const [isWished, setIsWished] = useState(initialWished);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState('');

  const { isLoggedIn, accessToken } = useUserStore((state) => state);

  const postWishlist = usePostWishlistMutation();
  const deleteWishlist = useDeleteWishlistMutation();

  const isLoading = postWishlist.isPending || deleteWishlist.isPending;

  const toggleWish = async () => {
    if (!isLoggedIn || !accessToken) {
      setPopoverMessage('로그인 후 이용할 수 있습니다');
      setIsPopoverOpen(true);
      setTimeout(() => setIsPopoverOpen(false), 3000);
      return;
    }

    try {
      if (!isWished) {
        await postWishlist.mutateAsync(meetingId);
        setIsWished(true);
        setPopoverMessage('관심 모임에 추가됐어요!');
      } else {
        await deleteWishlist.mutateAsync(meetingId);
        setIsWished(false);
        setPopoverMessage('관심 모임에서 제외됐어요');
      }

      if (onWishChange) {
        onWishChange(!isWished);
      }

      setIsPopoverOpen(true);

      setTimeout(() => {
        setIsPopoverOpen(false);
      }, 3000);
    } catch (error) {
      console.error('좋아요 토글 에러:', error);
      const errorMessage = '요청 처리에 실패했습니다';
      setPopoverMessage(errorMessage);
      setIsPopoverOpen(true);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent group"
          onClick={toggleWish}
          disabled={isLoading}
          aria-label={isWished ? '관심 모임에서 제거' : '관심 모임에 추가'}
        >
          <Heart
            className={
              isWished ? 'fill-danger/70 text-danger/70' : 'text-muted group-hover:fill-danger/30'
            }
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" side="bottom" align="end">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">{popoverMessage}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
