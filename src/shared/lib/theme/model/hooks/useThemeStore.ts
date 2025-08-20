import { create } from 'zustand';
import { ThemeState, Theme } from '../types';

const useThemeStore = create<ThemeState>((set) => ({
  theme: Theme.light,
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === Theme.light ? Theme.dark : Theme.light })),
}));

export default useThemeStore;
