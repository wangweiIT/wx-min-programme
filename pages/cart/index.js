/* 
1 获取用户的收货地址
  1.1 绑定点击事件
  1.2 调用小程序内置的 api 获取用户的收货地址 wx.chooseAddress(走不通，在用户拒绝权限后，重新点击后就不会触发了)

  1.2 获取 用户 对小程序 所授予 获取地址的 权限状态 scope (scope.address: true)
     1.2.1 假如 用户 点击获取收货地址的提示框 确定 scope 值为 true，可以直接调用，获取收货地址
     1.2.2 假设 用户 点击获取地址的提示框 取消 scope 值为 false （scope.address: false）
           a 诱导用户自己打开 授权设置界面 当用户重新给与 获取地址权限的时候
           b  获取收货地址
     1.2.3 假如 用户 从来没有调用过获取地址的api 则scope 为 undefined，可以直接调用，获取收货地址
  
2 页面加载完毕
  0 onLoad onShow(使用该事件，在页面显示时候触发)
  2.1 获取本地存储的地址数据 
  2.2 把数据 设置给 data 中一个变量 
     */

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx";
const regeneratorRuntime = require("../../lib/runtime/runtime.js");
Page({
  data: {
    address: {}
  },
  onShow() {
    console.log(2);
    let address = wx.getStorageSync('address');
    this.setData({
      address
    })

  },
  onLoad: function(options) {},
  // 点击 收货地址
  async handleAddress() {
    //  1. 获取 权限状态
    /* wx.getSetting({
      success: result => {
        // 2 获取权限状态
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress || scopeAddress === undefined) {
          // 可以直接调用获取收货地址api
          wx.chooseAddress({
            success: result1 => {
              console.log(result1);
            }
          });
        } else {
          // 用户 以前拒绝过授予权限 先诱导用户打开 授权页面
          wx.openSetting({
            success: result => {
              // 4 可以调用 收货地址代码
              wx.chooseAddress({
                success: result3 => {
                  console.log(result3);
                }
              });
            }
          });
        }
      }
    });
    */
    try {
      //  1 获取权限状态
      const result = await getSetting();
      const scopeAddress = result.authSetting["scope.address"];
      //  2 判断权限状态
      if (scopeAddress === false) {
        // 4 诱导用户打开授权api
        await openSetting();
      }
      //  3 调用获取收货地址的api
      const result1 = await chooseAddress();
      // console.log(result1);
      // 放入到地址缓存中去
      wx.setStorageSync('address', result1);
      console.log(1);
      
    } catch (error) {
      console.log(error);
    }
  }
});
