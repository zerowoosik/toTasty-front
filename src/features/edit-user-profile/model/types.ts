import { User } from '@/entities/user';

export default interface UpdatedUserProfile
  extends Partial<Pick<User, 'nickname' | 'profileImgUrl' | 'interests'>> {}
