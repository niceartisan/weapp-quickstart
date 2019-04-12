module.exports = {
  setStorage: function(key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({ key: key, data: value, success: resolve, fail: reject });
    });
  },

  getStorage: function(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({ key: key, success: resolve, fail: reject });
    });
  },

  getLocation: function(type) {
    return new Promise((resolve, reject) => {
      wx.getLocation({ type: type, success: resolve, fail: reject });
    });
  }
};
