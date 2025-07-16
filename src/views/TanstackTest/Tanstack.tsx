'use client';

import { useTanstackQuery } from '@/entities/TanstackTest/model/hooks/useTanstackQuery';

export function TanstackView(): string | React.JSX.Element {
  const { isPending, error, data, isFetching } = useTanstackQuery();

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
}
