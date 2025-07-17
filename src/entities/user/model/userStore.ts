// zustand로 로그인 유저 상태 관리

import { create } from 'zustand';
import { User } from './user';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

function createUserStore() {
  return create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  }));
}

const useUserStore = createUserStore();
export { useUserStore };
