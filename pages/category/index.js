// import { request } from "../../request/request";
// 引入第三方库，需要分别的引入
const regeneratorRuntime = require("../../lib/runtime/runtime.js");
const app = getApp();
// 获取请求 request
const request = app.globalData.request;

Page({
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 接口的返回数据
    cateList: [],
    // 当前选中的左侧index
    currentIndex: 0,
    // 初始化右侧内容的滚动条位置
    scrollTop: 0
  },
  onLoad: function(options) {
    /* 
    1 先判断一下本地存储中有没有旧的数据
      {time: Date.now(), data: [...]}
    2 没有旧数据，直接发送新的请求
    3 有旧的数据，同事旧的数据也没有过期，则使用本地存储的旧数据
    */
    //  1 获取本地中存储的数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      // 不存在 发送请求
      this.getCates();
    } else {
      // 有旧的数据，判断是否过期 定义过期时间为 10s
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        this.cateList = Cates.data || [];
        // 构造左侧的数据
        let leftMenuList = this.cateList.map(v => v.cat_name);
        let rightContent = this.cateList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }
  },
  //  获取分类数据
  // 使用async-await 进行同步改造
  async getCates() {
    /* request({ url: "/categories" })
      .then(result => {
        this.cateList = result.data.message || [];
        // 把接口中的数据存入缓存中去,和web中不同，不需要讲对象转为字符串再存
        // 你存什么数据，获取的时候就是什么类型
        wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });
        console.log("cateList:", this.cateList);
        // 构造左侧的数据
        let leftMenuList = this.cateList.map(v => v.cat_name);
        let rightContent = this.cateList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      })
      .catch(err => {
        console.log(err);
      }); */

    // 使用es7 的async-await来发送请求
    const result = await request({ url: "/categories" });
    console.log('result:', result);
    this.cateList = result || [];
    // 把接口中的数据存入缓存中去,和web中不同，不需要讲对象转为字符串再存
    // 你存什么数据，获取的时候就是什么类型
    wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });
    // 构造左侧的数据
    let leftMenuList = this.cateList.map(v => v.cat_name);
    let rightContent = this.cateList[0].children;
    this.setData({
      leftMenuList,
      rightContent
    });
  },
  // 点击左侧的菜单事件
  selectMenuItem(e) {
    /* 
    1 获取被点击的标题身上的索引
    2 给data中的currentIndex赋值就可以了
    3 页面绑定展示的值是this.data中的副本值，必须通过this.setData来进行更新
    4 通过this.setData 更新后副本和原型都会被更新
    */
    let { currentindex } = e.currentTarget.dataset;
    //  this.data.currentIndex
    let rightContent = this.cateList[currentindex].children;
    this.setData({
      currentIndex: currentindex,
      scrollTop: 0,
      rightContent
    });
    // console.log(this.data);
  }
});
