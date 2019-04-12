const api = require('../service/api');

module.exports = {
  getImg: function(name) {
    return `/images/${name}`;
  },
  showLoading: function() {
    wx.showLoading({
      title: '正在加载中...'
    });
  },
  hideLoading: function() {
    wx.hideLoading();
  },
  getError: function(err = { name: 'SYSTEM_ERROR', message: '系统错误' }) {
    const isString = Object.prototype.toString.call(err) === '[object String]';
    const isObj = Object.prototype.toString.call(err) === '[object Object]';
    const isError = Object.prototype.toString.call(err) === '[object Error]';

    if (isString) {
      return err;
    } else if (isObj) {
      return err.message;
    } else if (isError) {
      console.error(err);
    } else {
      return '未知错误';
    }
  },
  showErrorToast: function(error) {
    if (error.name === 'USER_NOT_LOGIN') {
      api.login().catch((err) => {
        wx.showToast({
          title: this.getError(err),
          icon: 'none',
          duration: 2000
        });
      });
      return;
    }
    wx.showToast({
      title: this.getError(error),
      icon: 'none',
      duration: 2000
    });
  },
  showSuccessToast: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    });
  },

  /**
   * 返回服务器当前时间
   * @return {String} 服务器当前时间
   */
  getNow: function() {
    let date = new Date();
    return date;
  },

  /**
   * 格式化时间
   * @param  {String} date 时间对象
   * @param  {String} format 格式
   * @return {String}        格式化过后的时间
   */
  formatDate: function(date, format = 'yyyy-MM-dd HH:mm:ss') {
    const source = new Date(date);
    const o = {
      'M+': source.getMonth() + 1, // 月份
      'd+': source.getDate(), // 日
      'H+': source.getHours(), // 小时
      'm+': source.getMinutes(), // 分
      's+': source.getSeconds(), // 秒
      'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
      'f+': source.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
  }
};
