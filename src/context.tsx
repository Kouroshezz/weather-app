import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useState, useEffect, type ReactNode } from 'react';

export type ChangeThemeType = {
  changeTheme: () => void;
  theme: 'light' | 'dark';
  username: string;
  setUsername: (name: string) => void;
};



export const ThemeContext = createContext<ChangeThemeType>({
  theme: 'light',
  changeTheme: () => { },
  username: '',
  setUsername: () => { },
});

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
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    app: {
      box: '#404961'
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
      primary: '#03464',
      secondary: '#050F24',
    },
    app: {
      box: '#CDD9E0'
    },
  },
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

  const changeTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('appTheme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext value={{ theme, changeTheme, username, setUsername }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext>
  );
}
