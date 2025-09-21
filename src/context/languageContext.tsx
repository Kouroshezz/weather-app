import { createContext, useState, type ReactNode } from "react";

type languages = {
  lang: 'en' | 'fa';
  setSelectLang: (lang: 'en' | 'fa') => void;
};


export const LangContext = createContext<languages>({
  lang: 'en',
  setSelectLang: () => { },
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [selectLang, setSelectLang] = useState<'en' | 'fa'>('en');

  return (
    <LangContext value={{ lang: selectLang, setSelectLang }}>
      {children}
    </LangContext>
  );
}
