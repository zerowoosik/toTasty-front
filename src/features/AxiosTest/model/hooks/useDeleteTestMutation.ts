import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { deleteTest } from '../../api/deleteTest';

export function useDeleteTestMutation(): UseMutationResult<any, Error, void, unknown> {
  return useMutation({ mutationFn: deleteTest });
}
