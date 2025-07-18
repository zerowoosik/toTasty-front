import { getApi } from '@/shared/api/axiosApis';
import Post from '../model/types';

export default async function getPostListTest(): Promise<Post[] | null> {
  return getApi<Post[]>(
    `/posts`,
    {}, // default : {}
    {}, // {Authorization : 'bearer ~~'}    // defulat : {}
    'https://jsonplaceholder.typicode.com', // default : env에 설정된 값
  );
}
