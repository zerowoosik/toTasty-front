import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { patchTest } from '../../api/patchTest';
import TestPost from '../types';
import getPostTestKeys from '@/entities/axios-test/model/getPostTest.keys';

export default function usePatchTestMutation(
  postId: number,
): UseMutationResult<TestPost | null, Error, void, unknown> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchTest(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getPostTestKeys.detail(postId).queryKey });
    }, // 게시글이 수정되면, post detail의 캐싱을 날려줘야 함
  });
}
