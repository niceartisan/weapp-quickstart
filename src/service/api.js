const fetch = require('../utils/fetch');
const tool = require('../utils/tool');

const get = (params = null) => {
  let url = 'test.json';

  return new Promise((resolve, reject) => {
    fetch(url, 'GET', params)
      .then((res) => {
        const { data = {} } = res;
        const { response = {} } = data;
        const { success, error } = response;

        if (success) {
          resolve(response);
        } else {
          reject(error);
        }
      })
      .catch((err) => {
        tool.showErrorToast(err);
      });
  });
};

const api = {
  test: (params) => {
    return get(params);
  }
};

module.exports = api;
