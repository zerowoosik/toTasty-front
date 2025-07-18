import { createQueryKeys } from '@lukemorales/query-key-factory';
import getPostDetailTest from '../api/getPostDetailTest';
import getPostListTest from '../api/getPostListTest';

const getPostTestKeys = createQueryKeys('postTest', {
  detail: (postId: number) => ({
    queryKey: [postId],
    queryFn: () => getPostDetailTest(postId),
  }),
  list: {
    queryKey: null,
    queryFn: getPostListTest,
  },
});

export default getPostTestKeys;
