'use client';

import { useDeleteTestMutation } from '@/features/axios-test/model/hooks/useDeleteTestMutation';
import { useEffect } from 'react';

export function DeleteTestView(): string | React.JSX.Element {
  const { mutate, data, isPending, isError, error } = useDeleteTestMutation();

  useEffect(() => {
    mutate();
  }, []);
  // 간단한 테스트이니 zustand 사용하지 않고 useEffect로

  if (isPending) return 'Loading...';

  if (isError) return `An error has occurred: ${error.message}`;

  if (!data) return 'data not received already';

  return (
    <div>
      {' '}
      <h1>Delete completed</h1>
    </div>
  );
}
