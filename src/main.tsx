import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeContextProvider } from './context.tsx';
import { BrowserRouter } from 'react-router';
import "./i18n";
import { CityProvider } from './context/cityContext.tsx';
import { LangProvider } from './context/languageContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <ThemeContextProvider>
          <CityProvider>
            <App />
          </CityProvider>
        </ThemeContextProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode >,
)
