'use client';

import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/shadcnUtils';

const DEFAULT_PROFILE_IMG = '/assets/icons/default-profile-icon.svg' as const;

const userIconStyles = cva('rounded-full object-cover', {
  variants: {
    iconType: {
      userListIcon: 'w-4 h-4', // 16px
      navIcon: 'w-9 h-9', // 36px
      myPageIcon: 'w-14 h-14', // 56px
    },
  },
  defaultVariants: {
    iconType: 'navIcon',
  },
});

const iconSizeMap = {
  userListIcon: 16,
  navIcon: 36,
  myPageIcon: 56,
} as const;

interface UserIconProps {
  type?: keyof typeof iconSizeMap;
  ImageUrl?: string;
  className?: string;
}

export default function UserIcon({
  type = 'navIcon',
  ImageUrl = DEFAULT_PROFILE_IMG,
  className,
}: UserIconProps) {
  const size = iconSizeMap[type];
  const src = ImageUrl?.trim() || DEFAULT_PROFILE_IMG;

  return (
    <Image
      src={src}
      alt={`${type} icon`}
      width={size}
      height={size}
      layout="fixed"
      quality={100}
      className={cn(userIconStyles({ iconType: type }), className)}
    />
  );
}
