import { KustomRoutes, Offer } from '@/lib/kustom-client-sdk/types';
import { createContext, useState } from 'react';

interface PagesContextType {
  routes: KustomRoutes;
  offers: Offer[];
}

const PagesContext = createContext<PagesContextType>({
  routes: {},
  offers: [],
});

interface PagesContextProviderProps {
  children: React.ReactNode;
  routes: KustomRoutes;
  offers: Offer[];
}

export const PagesContextProvider = (props: PagesContextProviderProps) => {
  const { children, routes, offers } = props;

  return (
    <PagesContext.Provider value={{ routes, offers }}>
      {children}
    </PagesContext.Provider>
  );
};

export default PagesContext;
