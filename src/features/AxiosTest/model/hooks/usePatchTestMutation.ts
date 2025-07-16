import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { patchTest } from '../../api/patchTest';

export function usePatchTestMutation(): UseMutationResult<any, Error, void, unknown> {
  return useMutation({ mutationFn: patchTest });
}
