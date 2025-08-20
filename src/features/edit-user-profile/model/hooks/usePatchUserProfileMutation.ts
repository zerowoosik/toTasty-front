import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user';
import patchUserProfile from '../../api/patchUserProfile';
import UpdatedUserProfile from '../types';

export default function usePatchUserProfileMutation(): UseMutationResult<
  UpdatedUserProfile | null,
  Error,
  UpdatedUserProfile,
  unknown
> {
  const { updateProfile } = useUserStore((state) => state);
  return useMutation({
    mutationFn: (data) => patchUserProfile(data),
    onSuccess: (data) => {
      if (data) updateProfile(data);
    },
  });
}
