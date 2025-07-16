import { TestPost } from '@/features/AxiosTest/model/types';
import { deleteApi } from '@/shared/api/axiosApis';

export async function deleteTest(): Promise<TestPost | null> {
  return deleteApi<TestPost>('/posts/1', 'https://jsonplaceholder.typicode.com/');
}
