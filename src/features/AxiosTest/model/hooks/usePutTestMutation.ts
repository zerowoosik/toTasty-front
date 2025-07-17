import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { putTest } from '../../api/putTest';
import { TestPost } from '../types';

export function usePutTestMutation(): UseMutationResult<TestPost | null, Error, void, unknown> {
  return useMutation({ mutationFn: putTest });
}
