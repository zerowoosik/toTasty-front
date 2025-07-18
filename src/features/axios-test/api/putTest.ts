import { putApi } from '@/shared/api/axiosApis';
import TestPost from '../model/types';

export async function putTest(): Promise<TestPost | null> {
  const post: TestPost = {
    title: '바뀐제목이야',
    body: '바뀐테스트내용이겠지?',
    userId: 1,
    id: 1,
  };

  const headers: object = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  return putApi<TestPost>('/posts/1', post, headers, 'https://jsonplaceholder.typicode.com/');
}
