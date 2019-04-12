/**
 * @param  {String} api 根地址
 * @param  {String} path 请求路径
 * @param  {String} method 请求方式
 * @param  {Object} params 参数
 */
module.exports = function(api, path, method, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}${path}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      method: method,
      success: resolve,
      fail: reject
    });
  });
};
