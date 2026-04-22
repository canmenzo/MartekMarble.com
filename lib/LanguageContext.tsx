'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang } from './translations';

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: 'en', setLang: () => {} });

function detectBrowserLang(): Lang {
  if (typeof navigator === 'undefined') return 'en';
  const bl = navigator.language?.toLowerCase() || '';
  if (bl.startsWith('tr')) return 'tr';
  if (bl.startsWith('es')) return 'es';
  if (bl.startsWith('pt')) return 'pt';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    if (!detected) {
      setLang(detectBrowserLang());
      setDetected(true);
    }
  }, [detected]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
