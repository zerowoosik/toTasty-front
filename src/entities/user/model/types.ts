export interface User {
  email: string;
  nickname: string;
  profileImgUrl: string;
  interest: string[];
}

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  logIn: (user: User) => void;
  logOut: () => void;
}
