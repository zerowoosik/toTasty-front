import { TestPost } from '@/features/AxiosTest/model/types';
import { patchApi } from '@/shared/api/axiosApis';

export async function patchTest(): Promise<TestPost | null> {
  const post: TestPost = {
    title: '일부만 변경할거야, 바뀐 값이겠지?',
  };

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  return patchApi<TestPost>('/posts/1', post, headers, 'https://jsonplaceholder.typicode.com/');
}
