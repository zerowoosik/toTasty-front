import { deleteApi } from '@/shared/api/axiosApis';
import TestPost from '@/features/axios-test/model/types';

export async function deleteTest(): Promise<TestPost | null> {
  return deleteApi<TestPost>('/posts/1', 'https://jsonplaceholder.typicode.com/');
}
