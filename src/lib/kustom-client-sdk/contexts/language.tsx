import { KustomRoutes, Offer } from '@/lib/kustom-client-sdk/types';
import { createContext, useState } from 'react';

export type LanguageContextKey = 'fr' | 'en' | 'es';

interface LanguageContextType {
  currentLang: LanguageContextKey;
  setCurrentLang: (lang: LanguageContextKey) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'fr',
  setCurrentLang: () => {},
});

interface LanguageContextProviderProps {
  children: React.ReactNode;
}

export const LanguageContextProvider = (
  props: LanguageContextProviderProps,
) => {
  const { children } = props;

  const [currentLang, setCurrentLang] = useState<LanguageContextKey>('fr');

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
