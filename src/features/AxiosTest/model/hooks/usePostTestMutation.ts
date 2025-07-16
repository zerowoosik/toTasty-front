import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postTest } from '../../api/postTest';

export function usePostTestMutation(): UseMutationResult<any, Error, void, unknown> {
  return useMutation({ mutationFn: postTest });
}
