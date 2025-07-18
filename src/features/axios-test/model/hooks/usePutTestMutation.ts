import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import getPostTestKeys from '@/entities/axios-test/model/getPostTest.keys';
import { putTest } from '../../api/putTest';
import TestPost from '../types';

export default function usePutTestMutation(
  postId: number,
): UseMutationResult<TestPost | null, Error, void, unknown> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => putTest(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getPostTestKeys.detail(postId).queryKey });
    }, // 게시글이 수정되면, post detail의 캐싱을 날려주어야 함.
  });
}
