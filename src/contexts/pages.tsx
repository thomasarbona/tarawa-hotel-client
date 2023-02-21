import { KustomRoutes } from '@/lib/kustom-client-sdk/types';
import { createContext, useState } from 'react';

interface PagesContextType {
  routes: KustomRoutes;
}

const PagesContext = createContext<PagesContextType>({ routes: {} });

interface PagesContextProviderProps {
  children: React.ReactNode;
  routes: KustomRoutes;
}

export const PagesContextProvider = (props: PagesContextProviderProps) => {
  const { children, routes } = props;

  return (
    <PagesContext.Provider value={{ routes }}>{children}</PagesContext.Provider>
  );
};

export default PagesContext;
