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

export const useUserStore = createUserStore();
