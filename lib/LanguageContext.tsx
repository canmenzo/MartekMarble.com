'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from './translations';

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: 'en', toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = () => setLang(l => l === 'en' ? 'tr' : 'en');
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
