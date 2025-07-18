'use client';

import { usePostListTestQuery } from '@/entities/axios-test';

export default function GetListTestView(): string | React.JSX.Element {
  const { isPending, error, data, isFetching } = usePostListTestQuery();

  if (isPending) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  if (!data) return 'data not received already';

  return (
    // 배열로 변경해야하는 부분 너무 많이는 안좋을듯하고 3개 정도만?
    <div>
      {data.slice(0, 3).map((item) => (
        // 3. React 리스트 렌더링 시 key prop은 필수
        <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <h1>User ID: {item.userId}</h1>
          <p>Post ID: {item.id}</p>
          <p>Title: {item.title}</p>
          <p>Body: {item.body}</p>
        </div>
      ))}
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
}
