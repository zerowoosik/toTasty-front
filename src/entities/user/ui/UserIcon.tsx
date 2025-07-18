import { Button } from '@/shared';
import Image from 'next/image';
import useUserStore from '../model/hooks/useUserStore';

export default function UserIcon() {
  const user = useUserStore((state) => state.user);
  if (!user) return null;

  return (
    <Button variant="secondary" size="icon" className="relative overflow-hidden rounded-full">
      <Image src={user.profileImgUrl} alt={`${user.nickname}의 프로필`} fill />
    </Button>
  );
}
