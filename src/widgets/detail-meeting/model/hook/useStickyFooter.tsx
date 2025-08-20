'use client';

import { useEffect, useState } from 'react';

export default function useStickyFooter() {
  const [isMobile, setIsMobile] = useState(false);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    const onMM = () => apply();
    mq.addEventListener('change', onMM);

    const onScroll = () => {
      if (mq.matches) {
        setIsFixed(false);
        return;
      }
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
      setIsFixed(!nearBottom);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      mq.removeEventListener('change', onMM);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { isMobile, isFixed };
}
