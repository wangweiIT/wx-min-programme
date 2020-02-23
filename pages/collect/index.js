// pages/collect/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true,
        type: 1
      },
      {
        id: 1,
        value: "品牌收藏",
        isActive: false,
        type: 2
      },
      {
        id: 2,
        value: "店铺收藏",
        isActive: false,
        type: 3
      },
      {
        id: 3,
        value: "浏览足迹",
        isActive: false,
        type: 4
      }
    ],
    collect:[]
  },
  onShow() {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
    })

  },
  // 根据标题的索引，激活 选中的标题数组
  changeTitleItemChange(selectedIndex) {
    // 1. 更新tabs中的iaActive方法
    let { tabs } = this.data;
    tabs.forEach((e, i) => {
      e.isActive = i === selectedIndex ? true : false;
    });
    // 2. 更新视图中的值
    this.setData({
      tabs
    });
  },
  tabsItemChange(e) {
    // 打印子组件传递的值
    console.log("来自子组件的值：", e);
    const selectedIndex = e.detail;
    this.changeTitleItemChange(selectedIndex);
    // 重新发送请求 type =1 index= 0
    // this.getOrders(selectedIndex + 1);
  }
});
