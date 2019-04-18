/*
 * @Description: 图标
 * @Author: qihao
 * @Date: 2019-03-16 18:28:38
 * @Last Modified by: qihao
 * @Last Modified time: 2019-04-12 14:01:36
 */

Component({
  properties: {
    name: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      value: '32px'
    },
    height: {
      type: String,
      value: '32px'
    }
  },
  data: {
    iconImage: ''
  },
  attached() {
    this.setData({iconImage: `/images/${this.data.name}`})
  }
});
