import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        className="dark:invert"
        src="/assets/logo/logo.svg"
        alt="logo"
        width={120}
        height={33}
        draggable={false}
      />
    </Link>
  );
}
