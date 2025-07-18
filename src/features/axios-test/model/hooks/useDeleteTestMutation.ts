import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import getPostTestKeys from '@/entities/axios-test/model/getPostTest.keys';
import { deleteTest } from '../../api/deleteTest';
import TestPost from '../types';

export default function useDeleteTestMutation(
  postId: number,
): UseMutationResult<TestPost | null, Error, void, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTest(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getPostTestKeys.all.queryKey });
    }, // 게시글이 삭제되면, post detail의 캐싱과 post list에 대한 캐싱을 날려주어야 함.
  });
}
