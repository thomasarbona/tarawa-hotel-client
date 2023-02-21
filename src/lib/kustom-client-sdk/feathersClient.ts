import feathers from '@feathersjs/feathers';
import fetch from 'node-fetch';
import rest from '@feathersjs/rest-client';

const getFeathersClientApp = (apiUrl: string) => {
  const app = feathers();

  const restClient = rest(apiUrl);

  if (typeof window !== 'undefined') {
    app.configure(restClient.fetch(window.fetch.bind(window)));
  } else {
    app.configure(restClient.fetch(fetch));
  }

  app.hooks({
    error(context) {
      console.error('Feathers error', context.error);
    },
  });

  return app;
};

export default getFeathersClientApp;
