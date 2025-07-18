import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { postTest } from '../../api/postTest';
import TestPost from '../types';
import getPostTestKeys from '@/entities/axios-test/model/getPostTest.keys';

export default function usePostTestMutation(): UseMutationResult<
  TestPost | null,
  Error,
  void,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getPostTestKeys.list.queryKey });
    }, // 게시글이 작성되면, post list에 대한 캐싱을 날려주어야 함.
  });
}
