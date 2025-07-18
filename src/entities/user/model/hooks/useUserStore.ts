import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User, UserState } from '../types';

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      logIn: (user) => set({ isLoggedIn: true, user: user as User }),
      logOut: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      // Zustand의 persist 미들웨어를 사용하여 상태를 로컬 스토리지에 저장
      name: 'user-storage', // 로컬 스토리지에 저장할 때 사용할 키
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
    },
  ),
);

export default useUserStore;
