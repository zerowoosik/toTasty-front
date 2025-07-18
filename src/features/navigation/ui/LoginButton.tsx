import { Button } from '@/shared';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button
        variant="outline"
        className="text-[#676DFF] font-semibold text-lg hover:text-[#676DFF] h-11"
      >
        로그인/회원가입
      </Button>
    </Link>
  );
}
