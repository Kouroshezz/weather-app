import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useState, useEffect, type ReactNode } from 'react';

export type ChangeThemeType = {
  changeTheme: (theme: 'light' | 'dark') => void;
  theme: 'light' | 'dark';
  username: string;
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
  username: '',
  setUsername: () => { },
  logout: () => { },
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('appTheme') as 'light' | 'dark');
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username') as string);


  // --- check theme and username on load ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') as 'light' | 'dark' | null;
    const savedUsername = localStorage.getItem('username') as string | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);


  useEffect(() => {
    username && localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const changeTheme = (theme: 'light' | 'dark') => {
    setTheme(theme)
  };

  const logout = () => {
    setUsername('');
    localStorage.removeItem('username');
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, username, setUsername, logout }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
