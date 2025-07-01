import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeMode } from '../types/theme';

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#f0f0f0',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    primary: '#1677ff',
    border: '#e5e5e5',
    sidebar: {
      background: '#ffffff',
      text: '#333333',
      active: '#1677ff',
      hover: '#f5f5f5',
    },
    code: {
      background: '#f8f9fa',
      text: '#333333',
    },
  },
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    primary: '#4096ff',
    border: '#404040',
    sidebar: {
      background: '#2d2d2d',
      text: '#ffffff',
      active: '#4096ff',
      hover: '#404040',
    },
    code: {
      background: '#1e1e1e',
      text: '#ffffff',
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as ThemeMode) || 'light';
  });

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  useEffect(() => {
    localStorage.setItem('theme-mode', themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode: handleSetThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 