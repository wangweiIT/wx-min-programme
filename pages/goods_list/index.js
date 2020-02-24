/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
   1.1 找到滚动条触底事件
   1.2 判断是否有下一页数据
   1.3 假如没有下一页数据 弹出一个提示
   1.4 假如有下一页数据，则加载下一页数据

2 下拉刷新页面
   1 触发下拉刷新事件
   2 重置 数据 数组
   3 重置页面 设置为1 重新查询接口
*/
const regeneratorRuntime = require("../../lib/runtime/runtime.js");
const app = getApp();
// 获取请求 request
const request = app.globalData.request;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    // 接口的参数
    queryParms: {
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10
    },
    // 商品列表数据
    goodsList: [],
    // 商品列表总数
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 注意这里是this.data下面的数据，不是this下的和vue有区别
    this.data.queryParms.cid = options.cat_id || '';
    this.data.queryParms.query = options.query || '';
    this.getGoodsList();
  },
  // 下拉触底触发事件
  onReachBottom() {
    if (
      this.data.queryParms.pagenum * this.data.queryParms.pagesize >=
      this.data.total
    ) {
      wx.showToast({
        title: "没有更多",
        icon: "success"
      });
    } else {
      this.data.queryParms.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新触发事件
  onPullDownRefresh() {
    // console.log("下拉刷新");
    // 1.重置数组
    this.setData({
      goodsList: []
    })
    // 2.重置页码
    this.data.queryParms.pagenum = 1;
    // 3.重新发送请求
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList() {
    var goodsObj = await request({
      url: "/goods/search",
      data: this.data.queryParms
    });
    // 查询到的总数
    this.data.total = goodsObj.total;
    this.setData({
      goodsList: [...this.data.goodsList, ...goodsObj.goods]
    });
    // 关闭下拉刷新窗口 如果没有掉用下拉刷新窗口，也不会报错
    wx.stopPullDownRefresh()
  },
  tabsItemChange(e) {
    // 打印子组件传递的值
    console.log("来自子组件的值：", e);
    const selectedIndex = e.detail;
    // 1. 更新tabs中的iaActive方法
    let { tabs } = this.data;
    tabs.forEach((e, i) => {
      e.isActive = i === selectedIndex ? true : false;
    });
    // 2. 更新视图中的值
    this.setData({
      tabs
    });
  }
});
