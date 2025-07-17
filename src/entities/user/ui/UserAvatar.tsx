// 유저 데이터를 기반으로 유저 상태를 보여줌
import useUserStore from '../model/userStore';

export function UserAvatar() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <img
      src={user.profileImg}
      alt={`${user.nickname}의 프로필`}
      className="rounded-full w-10 h-10"
    />
  );
}
