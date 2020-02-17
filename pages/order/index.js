/* 
 1 页面可能会频繁的打开，使用onShow
  1.0 onShow 不同于onLoad无法咋形参上获取url传值
  1.0.5 判断缓存中有没有token 如果没有就跳转到授权页面
  1.1 获取url上的参数 type 根据type tab 那个被激活选中
  1.2 根据type 去发送请求 获取订单数据
  1.3 渲染页面
 2 点击不同的标题 重新发送请求来获取和渲染数据
*/
const regeneratorRuntime = require("../../lib/runtime/runtime.js");
const app = getApp();
// 获取请求 request
const request = app.globalData.request;
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true,
        type: 1
      },
      {
        id: 1,
        value: "待付款",
        isActive: false,
        type: 2
      },
      {
        id: 2,
        value: "代发货",
        isActive: false,
        type: 3
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false,
        type: 4
      }
    ],
    orders: [
      {
        order_id: 428,
        user_id: 23,
        order_number: "HMDD20190802000000000428",
        order_price: 13999,
        order_pay: "0",
        is_send: "否",
        trade_no: "",
        order_fapiao_title: "个人",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "广东省广州市海珠区新港中路397号",
        pay_status: "1",
        create_time: 1564731518,
        update_time: 1564731518,
        order_detail: null,
        goods: [
          {
            id: 717,
            order_id: 428,
            goods_id: 43986,
            goods_price: 13999,
            goods_number: 1,
            goods_total_price: 13999,
            goods_name:
              "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            goods_small_logo:
              "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        total_count: 1,
        total_price: 13999
      }
    ]
  },
  onShow(options) {
    // 1 获取小程序的页面栈-内存数组 长度最大是10页面
    // 2 数组中 索引最大的页面就是当前页面
    const token = wx.getStorageSync("token");
    /* if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index"
      });
      return;
    } */
    debugger;
    let pages = getCurrentPages();
    let { type } = pages[pages.length - 1].options;
    this.changeTitleItemChange(type - 1);
    this.getOrders(type);
  },
  // 获取订单列表方法
  async getOrders(type) {
    // const res = await request({ url: "/my/orders/all", data: { type } });
    // console.log(res);
    this.setData({
      orders: this.data.orders.map(v=>({...v,create_time_cn:new Date(v.create_time * 1000).toLocaleTimeString()}))
    });
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
    this.getOrders(selectedIndex + 1);
  }
});
