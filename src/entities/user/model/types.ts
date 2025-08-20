export interface User {
  email: string;
  nickname: string;
  profileImgUrl: string;
  interests: string[];
  memberId: number;
}

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string;
  isHydrated: boolean;
  setLoggedIn: (user: User) => void;
  setLoggedOut: () => void;
  updateProfile: (partial: Partial<User>) => void;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setHydrated: (value: boolean) => void;
}

export interface ReissueResponse {
  accessToken: string;
  memberId: number;
  email: string;
  nickname: string;
  profileImgUrl: string;
  interests: string[];
}
