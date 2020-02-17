// pages/login/index.js
Page({
  getUserInfo(e) {
    const {userInfo} = e.detail
    console.log(userInfo);
    // 保存进缓存
    wx.setStorageSync('userInfo', userInfo);
    // 从哪来跳哪去
    wx.navigateBack({
      delta: 1
    });
  }
});
