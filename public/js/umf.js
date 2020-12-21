class UMF {
  constructor() {
    this.message = {};
  }

  createMessage(msg) {
    this.message = Object.assign({}, {
      mid: this.getUUID(),
      ts: this.getTS(),
      bdy: {}
    }, msg);
    return this;
  }

  toString(indent=2) {
    return JSON.stringify(this.message, null, indent);
  }

  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getTS() {
    return new Date().toISOString();
  }
}
