// 1 引入封装好的请求api
// 2 将他挂载到应用的全局变量上去
// 3 在需要使用它的页面上通过 getApp().globalData.request来获取
import { request } from "./request/request";
import { login, showModal, showToast, requestPayment } from "./utils/asyncWx";
App({
  onLaunch: function(options) {},
  onShow: function(options) {},
  onHide: function() {},
  onError: function(msg) {},
  onPageNotFound: function(options) {},
  globalData: {
    // 挂载到全局变量上
    request,
    login,
    showModal,
    showToast,
    requestPayment
  }
});
