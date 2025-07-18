import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { deleteTest } from '../../api/deleteTest';
import TestPost from '../types';

export default function useDeleteTestMutation(): UseMutationResult<
  TestPost | null,
  Error,
  void,
  unknown
> {
  return useMutation({ mutationFn: deleteTest });
}
