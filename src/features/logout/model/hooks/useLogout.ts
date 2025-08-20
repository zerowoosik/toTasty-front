import { useUserStore } from '@/entities/user';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import logout from '../../api/logout';

export default function useLogout() {
  const { setLoggedOut } = useUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      setLoggedOut();
      router.push('/');
    } catch (error) {
      toast.error(`로그아웃에 실패했습니다:${error instanceof Error ? error.message : error} `);
      console.log(`Logout failed: ${error instanceof Error ? error.message : error}`);
    }
  };

  return { handleLogout };
}
