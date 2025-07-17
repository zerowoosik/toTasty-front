import { createQueryKeys } from '@lukemorales/query-key-factory';
import getTanstack from '@/entities/tanstack-test/api/getTanstack';

const tanstackRepoKeys = createQueryKeys('tanstack', {
  repo: {
    queryKey: null,
    queryFn: getTanstack,
  },
});

export default tanstackRepoKeys;
