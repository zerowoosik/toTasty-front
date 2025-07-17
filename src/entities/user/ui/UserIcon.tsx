import { Button } from '@/shared/ui';
import { useUserStore } from '@/shared/lib/hooks/useUserStore';
import { useShallow } from 'zustand/shallow';
import Image from 'next/image';

function UserIcon() {
  const { profileImgUrl } = useUserStore(
    useShallow((state) => ({
      profileImgUrl: state.user.profileImgUrl,
    })),
  );
  return (
    <Button variant="secondary" size="icon" className="relative overflow-hidden rounded-full">
      <Image src={profileImgUrl} alt="profile-image" fill />
    </Button>
  );
}

export default UserIcon;
