/* 
1 发送请求获取数据
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage
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
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { goods_id } = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } });
    // console.log(res);
    // 避免保存过多无用的属性
    this.setData({
      goodsObj: {
        pics: res.pics,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    });
  },
  // 点击轮播图 发达预览
  handlePreviewImg(e) {
    console.log(e);
    // 预览的图片url集合
    let picUrlList = this.data.goodsObj.pics.map(v=> v.pics_mid_url)
    // 当前点击的图片
    let {currenturl} = e.currentTarget.dataset
    wx.previewImage({
      current: currenturl, // 当前显示图片的http链接
      urls: picUrlList // 需要预览的图片http链接列表
    })
    
  }
});
