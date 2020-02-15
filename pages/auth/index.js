const regeneratorRuntime = require("../../lib/runtime/runtime.js");
// 引入全局变量
const app = getApp();
const { login, request } = app.globalData;

Page({
  data: {},
  onLoad: function(options) {},

  async bindgetuserinfo(e) {
    try {
      // 1 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 2 获取小程序登录后的 code
      const { code } = await login();
      console.log(code);
      // 组装请求wxlogin的参数
      const parmas = { encryptedData, rawData, iv, signature, code };
      // 3 发送请求，获取用户的 token 值
      const { token } = await request({
        url: "/users/wxlogin",
        method: "POST",
        data: parmas
      });
      // 4 把 token 保存到缓存中去
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
});
