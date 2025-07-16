import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { putTest } from '../../api/putTest';

export function usePutTestMutation(): UseMutationResult<any, Error, void, unknown> {
  return useMutation({ mutationFn: putTest });
}
