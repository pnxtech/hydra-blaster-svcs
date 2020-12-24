class APIClient {
  async makeRequest(url, options) {
    if (!options.endpoint) {
      throw new Error('makeRequest: endpoint is a required options field');
    }

    const defaultOptions = {
      accept: 'application/json',
      authorize: true,
      contentType: 'application/json',
      method: 'GET',
      body: null,
    };

    options = Object.assign({}, defaultOptions, options);

    url = `${url}/${options.endpoint}`;
    let data = {
      headers: {
        'Accept': options.accept,
        'Content-Type': options.contentType,
      },
      method: options.method,
    };

    if (options.body) {
      if (['GET', 'DELETE'].indexOf(options.method) > -1) {
        url = `${url}?${querystring.stringify(options.body)}`;
      }

      if (['POST', 'PUT'].indexOf(options.method) > -1) {
        data.body = JSON.stringify(options.body);
      }
    }

    return (await fetch(url, data)).json();
  }
}
