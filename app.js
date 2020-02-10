// 1 引入封装好的请求api
// 2 将他挂载到应用的全局变量上去
// 3 在需要使用它的页面上通过 getApp().globalData.request来获取

import { request } from "./request/request";
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options) {
    
  },
  onShow: function(options) {

  },
  onHide: function() {

  },
  onError: function(msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {

  },
  globalData: {
    // 挂载到全局变量上
    request
  }
});
  