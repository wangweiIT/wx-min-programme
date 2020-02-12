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
     
3 onShow
  0 回到商品详情页 第一次添加商品的时候 手动添加了属性
    1 num = 1
    2 checked = true
  1 获取缓存中的购物车数组
  2  把购物车数据填充到data中

4 全选的实现 数据的展示
  1 在onshow 获取到缓存中的数组
  2 根据购物车中的商品数据进行计算 所有的商品都被选中了 checked 则全选就被选中
  3 空数组 调用 every 返回就是true
  
5 总价格和总数量
  1 都需要商品被选中 我们才拿来计算
  2 获取到购物车的数组，变量判断商品是否被选中
  3 若被选中了，则计算它们的数量和总价  

6 商品的选中
  1 绑定change 事件
  2 获取被修改的商品的对象
  3 商品对象的选中状态 取反
  4 重新填充到 data中和缓存中
  5 重新计算全选，总几个和总数量
  */

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx";
const regeneratorRuntime = require("../../lib/runtime/runtime.js");
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    console.log(2);
    debugger;
    let address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    let totalPrice = 0;
    let totalNum = 0;
    // 计算全选
    const allChecked = cart.length
      ? cart.every(v => {
          if (v.checked) {
            totalNum += v.num;
            totalPrice += v.goods_price * v.num;
          }
          return v.checked;
        })
      : false;
    this.setData({
      address,
      cart,
      allChecked,
      totalNum,
      totalPrice
    });
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

    // 页面是先触发获取地址的成功回调后 才会触发页面的 onShow
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
      wx.setStorageSync("address", result1);
      console.log(1);
    } catch (error) {
      console.log(error);
    }
  },

  handleItemChange(e) {
    // 1 获取被修改的商品的ID
    const { id } = e.currentTarget.dataset;
    console.log(id);
    // 2 获取购物车数组
    let { cart } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;
    // 重新计算
    let totalPrice = 0;
    let totalNum = 0;
    // 计算全选
    const allChecked = cart.length
      ? cart.every(v => {
          if (v.checked) {
            totalNum += v.num;
            totalPrice += v.goods_price * v.num;
          }
          return v.checked;
        })
      : false;
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    });

    // 5 6 把购物车数据重新写入data和缓存中
    wx.setStorageSync("cart", cart);
  }
});
