// 使用scroll-view实现左右联动滚动效果

const app = getApp();
const Mock = require('../../libs/mock-min.js');
// const { Random } = Mock;
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'items|10-20': [
    {
      'id|+1': 1,
      name: function() {
        return `标题${this.id}`;
      },
      'subItems|1-5': [
        {
          'id|+1': 100
        }
      ]
    }
  ]
});

Page({
  data: {
    // 首页商品信息
    items: data.items,
    itemHeight: 100,
    viewName: 'tea-type-0',
    selected: 0
  },

  onLoad() {
    this.heightList = this.calcAreaHeight(this.calcSubAreaHeight());
  },

  // 侧边栏点击事件
  onItemTap(e) {
    const index = e.currentTarget.dataset.index;
    this.setSelected(index);
    this.setData({ viewName: `tea-type-${index}` });
  },

  // 设置选中区域索引值
  setSelected(index) {
    if (index === this.data.selected) {
      return;
    }
    this.setData({
      selected: index
    });
  },

  // 计算每个子区域的高度
  calcSubAreaHeight() {
    let result = [];
    this.data.items.forEach((item) => {
      result.push(app.rpx2px(item.subItems.length * 200 + 60));
    });
    return result;
  },

  // 计算每个区域所在高度范围
  calcAreaHeight(heightList) {
    const len = heightList.length;
    let count = 0;
    let result = [];
    for (let i = 0; i < len; i++) {
      count += heightList[i];
      result.push(count);
    }
    console.log(result);
    return result;
  },

  // 获取所在区域的索引值
  getSelected(scrollTop) {
    const len = this.heightList.length;
    let index = 0;
    for (let i = 0; i < len; i++) {
      if (scrollTop < this.heightList[i]) {
        index = i;
        break;
      }
    }
    return index;
  },

  // 内容区域滚动监听
  onContentScroll(e) {
    const { scrollTop } = e.detail;
    const selected = this.getSelected(scrollTop);
    this.setSelected(selected);
  }
});
