import getKustomClient from './lib/kustom-client-sdk';

const getKustomClientInstance = () =>
  getKustomClient({
    establishmentId: '63ea42e6dd3f18461df228d3',
    kustomApiUrl: 'http://185.145.250.140:3030',
  });

export default getKustomClientInstance;
