export enum Theme {
  light = 'light',
  dark = 'dark',
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
