// pages/user/index.js
Page({
  data: {
    userInfo:{}
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    // 填充进 data 中
    this.setData({
      userInfo
    })
  }
})