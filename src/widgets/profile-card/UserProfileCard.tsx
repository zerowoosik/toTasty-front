'use client';

import { useUserStore } from '@/entities/user';
import { UserIcon } from '@/shared';
import Image from 'next/image';
import ProfileEditDialog from './ui/ProfileEditDialog';

const PROFILE_CARD_IMAGE = '/assets/image/profile-card-image.svg' as const;

export default function UserProfileCard() {
  const { user } = useUserStore();
  if (!user) return null;

  const drinkMap: { [key: string]: string } = {
    COFFEE: '커피',
    WHISKY: '위스키',
    WINE: '와인',
  };

  return (
    <div className="relative flex flex-col w-full h-[148px] rounded-2xl overflow-hidden shadow-xs bg-secondary outline-1 outline-muted">
      <div className="bg-primary h-[66px] relative flex flex-col justify-between">
        <div className="flex justify-between px-6 mt-4 ">
          <h1 className="text-foreground text-lg font-semibold">내 프로필</h1>
          <ProfileEditDialog />
        </div>
        <div className="left-0 w-full h-[2px] bg-primary-060 mb-1.5" />
        <Image
          src={PROFILE_CARD_IMAGE}
          alt="profile-card-image"
          width={158}
          height={47.5}
          draggable={false}
          className="absolute mb-1.5 bottom-0 right-32"
        />
      </div>
      <div className="absolute left-6 top-[58px]">
        <UserIcon
          type="myPageIcon"
          ImageUrl={user.profileImgUrl}
          className="outline-4 outline-white"
        />
      </div>

      <div className="px-25 py-3 grow text-gray-600">
        <h2 className="text-foreground font-semibold text-base my-1">{user.nickname}</h2>
        <div className="text-secondary-foreground text-sm">
          <span className="font-medium">관심사. </span>
          {user.interests.map((interest) => drinkMap[interest]).join(', ')}
        </div>
      </div>
    </div>
  );
}
