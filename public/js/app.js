class App {
  constructor(config) {
    this.config = config;
    this.appStoreKey = this.config.appStoreKey;
    this.apiClient = new APIClient(this.config);
    this.appStorage = new AppLocalStorage();
    this.appID = this.apiClient.getUUID();
    this.stor = Object.assign({
      server: {
        version: 'v1',
        targetServer: 'https://hydra-blaster.ngrok.io'
      }
    }, this.appStorage.get(this.appStoreKey));
  }

  getAppTitle() {
    return this.config.appTitle;
  }

  getVersion() {
    return this.config.version;
  }

  getStor() {
    return this.stor;
  }

  handleAboutPage() {
    let element = document.getElementById('about_appversion');
    element.innerHTML = window.app.getVersion();
    element = document.getElementById('about_apptitle');
    element.innerHTML = window.app.getAppTitle();
    // this.stor.history.push('about_apptitle');
    // this.appStorage.put(this.appStoreKey, this.stor);
  }

  handleSettingsPage() {
    let element = document.getElementById('settings_serverPath');
    element.setAttribute('value', this.stor.server.targetServer);
  }
}
