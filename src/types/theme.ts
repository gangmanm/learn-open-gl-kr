export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    primary: string;
    border: string;
    sidebar: {
      background: string;
      text: string;
      active: string;
      hover: string;
    };
    code: {
      background: string;
      text: string;
    };
  };
} 