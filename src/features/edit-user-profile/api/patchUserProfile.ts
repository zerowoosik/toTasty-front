import { patchApi } from '@/shared/api/axiosApis';
import UpdatedUserProfile from '../model/types';

export default async function patchUserProfile(
  userProfile: UpdatedUserProfile,
): Promise<UpdatedUserProfile | null> {
  const headers = {
    'Content-Type': 'application/json',
  };
  return patchApi<UpdatedUserProfile>(`/api/v1/users/edit-profile`, userProfile, headers);
}
