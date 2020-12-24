const config = {
  version: '1.0.0',
  appTitle: 'Hydra Blaster',
  appStoreKey: 'hydra_blaster',
  apiServer: {
    version: 'v1',
    targetServer: 'http://localhost:5353',
    targetService: 'hydra-blaster-svcs:/'
  },
  wsServer: {
    targetServer: 'ws://localhost:5353/ws',
    targetService: 'hydra-blaster-svcs:/'
  }
};
