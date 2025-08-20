'use client';

import {
  FavoriteMeetingCardArea,
  NewMeetingCardArea,
  PopularMeetingCardArea,
  WishlistCardArea,
  DummyCardArea,
} from '@/entities/homeMeetingCard/index';
import { Button } from '@/shared';
import Link from 'next/link';
import { useUserStore } from '@/entities/user';
import { useEffect, useMemo } from 'react';
import useWishlistMeetingsQuery from '@/entities/homeMeetingCard/model/hooks/useWishlistQuery';
import useNewMeetingsQuery from '@/entities/homeMeetingCard/model/hooks/useNewMeetingsQuery';
import usePopularMeetingsQuery from '@/entities/homeMeetingCard/model/hooks/usePopularMeetingsQuery';
import useFavoriteMeetingsQuery from '@/entities/homeMeetingCard/model/hooks/useFavoriteMeetingsQuery';

export default function HomePage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const rawInterests = useUserStore((state) => state.user?.interests);
  const interests = useMemo(() => rawInterests || [], [rawInterests]);
  const { refetch: refetchWishlist } = useWishlistMeetingsQuery();
  const { refetch: refetchNew } = useNewMeetingsQuery();
  const { refetch: refetchPopular } = usePopularMeetingsQuery();
  const { refetch: refetchFavorite } = useFavoriteMeetingsQuery(interests);

  useEffect(() => {
    const handleFocus = () => {
      refetchNew();
      refetchPopular();

      if (isLoggedIn) {
        refetchWishlist();
        refetchFavorite();
      }
    };

    window.addEventListener('focus', handleFocus);

    refetchNew();
    refetchPopular();
    if (isLoggedIn) {
      refetchWishlist();
      refetchFavorite();
    }

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetchWishlist, refetchNew, refetchPopular, refetchFavorite, isLoggedIn, interests]);

  return (
    <main className="flex items-center justify-center flex-col gap-4 py-[40px]">
      <div className="w-[1142px]">
        <h1 className="font-semibold text-xl pb-[20px]">신규모임</h1>
        <NewMeetingCardArea />
      </div>
      <div className="w-[1142px]">
        <h1 className="font-semibold text-xl pb-[20px] mt-8">인기모임</h1>
        <PopularMeetingCardArea />
      </div>
      <div className="relative w-[1142px]">
        <div
          className={`flex flex-col gap-4 mt-8 ${!isLoggedIn ? 'blur-sm pointer-events-none' : ''}`}
        >
          <h1 className="font-semibold text-xl ">내가 좋아할 모임</h1>
          {isLoggedIn ? <FavoriteMeetingCardArea /> : <DummyCardArea />}
          <div>
            <h1 className="font-semibold text-xl pb-[20px]">위시리스트</h1>
            {isLoggedIn ? <WishlistCardArea /> : <DummyCardArea />}
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="absolute top-330 z-10 bg-opacity-50 flex gap-4 flex-col items-center justify-center w-[1142px]">
          <span className="text-foreground text-2xl">로그인 후에 이용가능 합니다.</span>

          <Button variant="default" size="lg" className="w-55 h-11 cursor-pointer">
            <Link href="/login" className="font-semibold text-background">
              로그인하기
            </Link>
          </Button>
        </div>
      )}
    </main>
  );
}
