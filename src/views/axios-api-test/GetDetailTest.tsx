'use client';

import { usePostDetailTestQuery } from '@/entities/axios-test';

export default function GetDetailTestView(): string | React.JSX.Element {
  const { isPending, error, data, isFetching } = usePostDetailTestQuery(1); // postId : 1

  if (isPending) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  if (!data) return 'data not received already';

  return (
    <div>
      <h1>{data.userId}</h1>
      <p>{data.id}</p>
      <p>{data.title}</p>
      <p>{data.body}</p>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
}
