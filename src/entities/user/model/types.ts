export interface User {
  email: string;
  nickname: string;
  profileImgUrl: string;
  interest: string[];
  memberId: number;
  accessToken: string;
}

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  logIn: (user: User) => void;
  logOut: () => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

export interface ReissueResponse {
  accessToken: string;
  user: User;
}
