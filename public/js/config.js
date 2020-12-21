const config = {
  version: '0.1.0',
  appTitle: 'Hydra Blaster',
  appStoreKey: 'hydra_blaster',
  apiServer: {
    version: 'v1',
    targetServer: 'https://hydra-blaster.ngrok.io',
    targetService: 'hydra-blaster-svcs:/'
  },
  wsServer: {
    targetServer: 'wss://hydra-blaster.ngrok.io/ws',
    targetService: 'hydra-blaster-svcs:/'
  }
};
