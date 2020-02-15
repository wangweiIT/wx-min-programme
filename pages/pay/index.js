const regeneratorRuntime = require("../../lib/runtime/runtime.js");

// 引入全局变量
const app = getApp();
const { request, requestPayment, showToast } = app.globalData;
/*  
 1 页面加载的时候
  1 从缓存中获取 checked = true 的数组

 2 微信支付
  1 那些人 那些账号 可以实现微信支付
   1 企业账号 
   2 企业账号的小程序后台中 必须 给开发者 添加上白名单
    2.1 一个 APPId 可以同时绑定多个开发者
    2.2 这些开发者就可以共用这个APPId 和 它的开发权限 
 3 支付按钮
   1 先判断缓存中是否有token
   2 没有 跳转至授权页面 进行获取token
   3 有token...  
   4 创建订单 获取订单编号
   5 已经完成支付
   6 手动删除缓存中 已经被选中的商品 保存缓存
   7 跳转到订单查询页面
*/

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    let address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    // 过滤后的数组
    let checkedCart = cart.filter(v => v.checked);
    // 设置购物车状态
    this.setCart(checkedCart);
    this.setData({
      address
    });
  },
  // 设置购物车的状态  重新计算底部的 全选 总价格 购买数量
  setCart(cart) {
    // 重新计算
    let totalPrice = 0;
    let totalNum = 0;
    // 计算全选
    if (cart.length !== 0) {
      cart.forEach(v => {
        totalNum += v.num;
        totalPrice += v.goods_price * v.num;
      });
    }
    this.setData({
      totalNum,
      totalPrice,
      cart
    });
  },
  // 点击支付
  async handleOrderPay() {
    try {
      // 1 判断缓存中有没有token
      const token = wx.getStorageSync("token");
      // 2 判断
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index"
        });
        return;
      }
      console.log("已经存在token");
      // 3 创建订单
      //  3.1 请求头 参数
      const header = { Authorization: token };
      //  3.2 请求体
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => {
        var goodItem = {
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        };
        goods.push(goodItem);
      });
      // 4 发送请求 创建订单 获取订单编号
      const { order_number } = await request({
        url: "/my/orders/create",
        method: "POST",
        data: { order_price, consignee_addr, goods },
        header
      });
      // 5 发起预支付
      const { pay } = await request({
        url: "/my/orders/req_unifiedorder",
        method: "POST",
        data: { order_number },
        header
      });
      // 6 调用微信支付接口
      await requestPayment(pay);
      // 7 查询订单
      await request({
        url: "/my/orders/chkOrder",
        method: "POST",
        data: { order_number },
        header
      });
      showToast({ title: "支付成功" });
      // 8 更新缓存中个的购车页面
      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(v=>!v.checked)
      wx.wx.setStorageSync('cart', newCart);
      // 9 支付成功 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index'
      });
    } catch (error) {
      showToast({ title: "支付失败" });
      console.log(error);
    }
  }
});
