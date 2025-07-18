import { deleteApi } from '@/shared/api/axiosApis';
import TestPost from '../model/types';

export async function deleteTest(postId: number): Promise<TestPost | null> {
  return deleteApi<TestPost>(`/posts/${postId}`, 'https://jsonplaceholder.typicode.com/');
}
