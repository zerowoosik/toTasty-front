import Image from 'next/image';
import Link from 'next/link';
import useThemeStore from '../lib/theme/model/hooks/useThemeStore';
import { Theme } from '../lib/theme';

export default function Logo() {
  const { theme } = useThemeStore();
  const logoTheme = theme === Theme.dark ? 'logo_w' : 'logo';
  return (
    <Link href="/">
      <Image
        src={`/assets/logo/${logoTheme}.svg`}
        alt="logo"
        width={120}
        height={33}
        draggable={false}
        className="transition-all"
      />
    </Link>
  );
}
