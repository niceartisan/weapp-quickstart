const wechat = require('./utils/wechat');
const tool = require('./utils/tool');
const service = require('./service/api');

App({
  globalData: {},
  service: service,
  ...wechat,
  ...tool
});
