// pages/user/index.js
Page({
  data: {
    userInfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];
    // 填充进 data 中
    this.setData({
      userInfo,
      collectNums: collect.length
    });
  }
});
