import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { patchTest } from '../../api/patchTest';
import { TestPost } from '../types';

export function usePatchTestMutation(): UseMutationResult<TestPost | null, Error, void, unknown> {
  return useMutation({ mutationFn: patchTest });
}
