import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postTest } from '../../api/postTest';
import TestPost from '../types';

export default function usePostTestMutation(): UseMutationResult<
  TestPost | null,
  Error,
  void,
  unknown
> {
  return useMutation({ mutationFn: postTest });
}
