// import { request } from "../../request/request";
const app =  getApp();
// 获取请求 request
const request = app.globalData.request;
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航 数组
    cateList: [],
    // 楼层 数组
    floorList: []
  },
  //页面开始加载  就会触发
  onLoad: function(options) {
    // 1 发送异步请求 获取轮播图数组 通过es6 的promise进行优化封装，防止回调地狱
    /* var reqTask = wx.request({
      url: '/home/swiperdata',
      success: (result) => {
        console.log(result);
        const swiperList = result || []
        this.setData({
          swiperList
        })
      }
    }); */
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 请求接口，查询轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        const swiperList = result || [];
        this.setData({
          swiperList
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 请求接口，分类导航数据
  getCateList() {
    request({ url: "/home/catitems" })
      .then(result => {
        const cateList = result || [];
        this.setData({
          cateList
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 请求接口，楼层数据
  getFloorList() {
    request({ url: "/home/floordata" })
      .then(result => {
        const floorList = result || [];
        this.setData({
          floorList
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});
