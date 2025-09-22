import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useState, useEffect, type ReactNode } from 'react';

export type ChangeThemeType = {
  changeTheme: (theme: 'light' | 'dark') => void;
  theme: 'light' | 'dark';
  username: string | null;
  setUsername: (name: string) => void;
  logout: () => void
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#151D32',
      paper: '#292F45',
    },
    primary: {
      main: '#2196F3',
    },
    text: {
      primary: '#F3F4F7',
      secondary: '#B0B0B0',
    },
    app: {
      weatherBox: '#404961',
      box: '#292F45',
      text: '#F3F4F7'
    }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F3FAFE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#003464',
      secondary: '#050F24',
    },
    app: {
      weatherBox: '#CDD9E0',
      box: '#E1E9EE',
      text: '#003464'
    },
  },
});

export const ThemeContext = createContext<ChangeThemeType>({
  theme: 'light',
  changeTheme: () => { },
  username: null,
  setUsername: () => { },
  logout: () => { },
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
  });
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username'));

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const changeTheme = (theme: 'light' | 'dark') => {
    setTheme(theme)
  };

  const logout = () => {
    setUsername(null);
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, username, setUsername, logout }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
