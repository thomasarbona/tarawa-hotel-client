import { paramsForServer } from 'feathers-hooks-common';

import getFeathersClientApp from './feathersClient';
import { KustomPage, KustomRoutes } from './types';

interface KustomClientConfig {
  establishmentId: string;
  kustomApiUrl?: string;
}

const DEFAULT_KUSTOM_API_URL = 'http://185.145.250.140:3030';

const getKustomClient = (config: KustomClientConfig) => {
  const { establishmentId, kustomApiUrl = DEFAULT_KUSTOM_API_URL } = config;

  const app = getFeathersClientApp(kustomApiUrl);

  const client = {
    fetchPages: async (): Promise<KustomPage[]> => {
      try {
        const data = await app.service('pages').find(
          paramsForServer({
            query: { establishmentId },
            stage: 'production',
          }),
        );
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    getRoutes: async () => {
      const pages = await client.fetchPages();

      return pages.reduce((acc, page: KustomPage) => {
        if (page.prettyUrl) {
          acc[page.prettyUrl] = page;
        }

        return acc;
      }, {} as KustomRoutes);
    },
  };

  return client;
};

export default getKustomClient;
