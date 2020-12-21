class App {
  constructor(config) {
    this.editor = null;
    this.config = config;
    this.appStoreKey = this.config.appStoreKey;
    this.apiClient = new APIClient(this.config);
    this.appStorage = new AppLocalStorage();
    this.appID = (new UMF()).getUUID();

    let inStor = this.appStorage.get(this.appStoreKey);
    if (!Object.keys(inStor).length) {
      this.stor = {
        server: this.config.apiServer
      };
      this.appStorage.put(this.appStoreKey, this.stor);
    } else {
      this.stor = Object.assign({}, {
        server: this.config.apiServer
      }, inStor);
    }
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

    this.editor = ace.edit('settings_editor');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.setOptions({
      mode: 'ace/mode/json',
      useWorker: false,
      tabSize: 2,
      useSoftTabs: true
    });

    element = document.getElementById('editor_createMessage');
    element.addEventListener('click', this.handleEditorCreateMessage.bind(this));

    element = document.getElementById('editor_updateMessage');
    element.addEventListener('click', this.handleEditorUpdateMessage.bind(this));

    element = document.getElementById('editor_reformatMessage');
    element.addEventListener('click', this.handleEditorReformatMessage.bind(this));
  }

  handleEditorCreateMessage() {
    let umf = new UMF();
    let msg = umf.createMessage({
      to: `${this.stor.server.targetService}`,
      from: 'hydra-blaster-app:/'
    });
    this.editor.setValue(msg.toString());
    this.editor.clearSelection();
  }

  handleEditorUpdateMessage() {
    let msg = this.editor.getValue();
    if (msg) {
      let umf = new UMF();
      msg = umf.createMessage(Object.assign({}, JSON.parse(msg), {
        mid: umf.getUUID(),
        ts: umf.getTS()
      }));
      this.editor.setValue(msg.toString());
      this.editor.clearSelection();
    }
  }

  handleEditorReformatMessage() {
    let msg = this.editor.getValue();
    if (msg) {
      let umf = new UMF();
      msg = umf.createMessage(JSON.parse(msg));
      this.editor.setValue(msg.toString(2));
      this.editor.clearSelection();
    }
  }
}
