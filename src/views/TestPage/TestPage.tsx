'use client';

import { useCountStore } from '@/shared/lib/hooks/useCountStore';
import { Button } from '@/shared/ui/Button';
import { useShallow } from 'zustand/shallow';

export function TestPage() {
  const { count, increment } = useCountStore(
    useShallow((state) => ({
      // 선택자 함수로 필요한 속성만 구독, useShallow를 사용해 불필요한 리렌더링 방지
      count: state.count,
      increment: state.increment,
    })),
  );

  return (
    <>
      <div>This Page is test Page.</div>
      <Button onClick={increment}>Button</Button>
      <div>{count}번 클릭되었습니다.</div>
    </>
  );
}
