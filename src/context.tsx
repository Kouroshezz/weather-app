import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useState, useEffect, type ReactNode } from 'react';

export type ChangeThemeType = {
  changeTheme: (theme: 'light' | 'dark') => void;
  theme: 'light' | 'dark';
  username: string;
  setUsername: (name: string) => void;
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
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [username, setUsername] = useState<string>('');


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
  }, [username, theme]);


  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  const changeTheme = (theme: 'light' | 'dark') => {
    localStorage.setItem('appTheme', theme);
    setTheme(theme)

  };

  return (
    <ThemeContext value={{ theme, changeTheme, username, setUsername }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext>
  );
}
