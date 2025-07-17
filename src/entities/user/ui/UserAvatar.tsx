import Image from 'next/image';
import { useUserStore } from '../model/userStore';

export function UserAvatar() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <Image
      src={user.profileImg}
      alt={`${user.nickname}의 프로필`}
      width={40}
      height={40}
      className="rounded-full"
    />
  );
}
