import { Button } from '@/shared';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button
        variant="outline"
        className="h-11 bg-white font-semibold text-lg text-primary hover:text-primary"
      >
        로그인/회원가입
      </Button>
    </Link>
  );
}
