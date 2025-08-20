'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, UserState } from '../types';

const initialUserState = {
  user: null,
  isLoggedIn: false,
  accessToken: '',
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialUserState,
      isHydrated: false,

      setLoggedIn: (user: User) => set({ user, isLoggedIn: true }),
      setLoggedOut: () =>
        set((state) => ({
          ...initialUserState,
          isHydrated: state.isHydrated,
        })),
      updateProfile: (partial) =>
        set((state) => (state.user ? { user: { ...state.user, ...partial } } : state)),
      setAccessToken: (token: string) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: '' }),
      setHydrated: (state: boolean) => set({ isHydrated: state }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    },
  ),
);
export default useUserStore;
