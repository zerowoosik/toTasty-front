import { postApi } from '@/shared/api/axiosApis';
import { TestPost } from '@/features/axios-test/model/types';

export async function postTest(): Promise<TestPost | null> {
  const post: TestPost = {
    title: '테스트제목',
    body: '테스트내용',
    userId: 1,
  };

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  return postApi<TestPost>('/posts', post, headers, 'https://jsonplaceholder.typicode.com/');
}
