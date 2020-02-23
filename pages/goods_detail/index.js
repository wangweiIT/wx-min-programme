/* 
1 发送请求获取数据
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage

3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据（数组）
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组填充回缓存中
  5 不存在于购物车数组中 直接给购物车数组添加一个新元素 带上购买的数量属性
  6 弹出用户提示

4 商品收藏
  1 页面onShow的时候 加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏
    1 是 改变页面的图标
    2 不是。。
   3 点击商品收藏按钮
    1 判断该商品是否存在于缓存的数组中
    2 已经存在，则删除该商品
    3 没有存在，把商品添加到收藏数组中，也存入缓存中即可
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
    goodsObj: {},
    // 商品是否被收藏过
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    var curPages = getCurrentPages();
    const options = curPages[curPages.length - 1].options;
    const { goods_id } = options;
    console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } });
    // 1 获取缓存中收藏数组
    let collet = wx.getStorageSync("collect") || [];
    // 2 判断商品是否被收藏了
    let isCollect = collet.some(
      v => v.goods_id === res.goods_id
    );
    // 避免保存过多无用的属性
    this.setData({
      goodsObj: {
        pics: res.pics,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        goods_id: res.goods_id,
        goods_big_logo: res.goods_big_logo,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, ".jpg")
      },
      isCollect
    });
  },
  // 点击轮播图 发达预览
  handlePreviewImg(e) {
    console.log(e);
    // 预览的图片url集合
    let picUrlList = this.data.goodsObj.pics.map(v => v.pics_mid_url);
    // 当前点击的图片
    let { currenturl } = e.currentTarget.dataset;
    wx.previewImage({
      current: currenturl, // 当前显示图片的http链接
      urls: picUrlList // 需要预览的图片http链接列表
    });
  },
  // 点击加入购物车
  handleCartAdd() {
    // console.log('购物车');
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    // 2 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.data.goodsObj.goods_id);
    if (index === -1) {
      // 3 不存在，则是第一次添加
      this.data.goodsObj.num = 1;
      // 处于选中状态
      this.data.goodsObj.checked = true;
      cart.push(this.data.goodsObj);
    } else {
      // 4 已经存在 则num++
      cart[index].num++;
    }
    // 5 把购物车重新添加回缓存中去
    wx.setStorageSync("cart", cart);
    // 6 弹窗提示
    wx.showToast({
      title: "加入购物车成功",
      icon: "success",
      mask: true
    });
  },
  // 点击商品中的收藏
  handleCollect() {
    let isCollect = false
    // 1 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []
    // 2 判断该商品是否被收藏过
    let index =collect.findIndex(v=>v.goods_id === this.data.goodsObj.goods_id)
    // 3 当 index !== -1 就表示已经收藏过
    if (index !== -1) {
      // 收藏过 在数组中删除
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      });
    } else {
      // 没收藏过
      collect.push(this.data.goodsObj)
      isCollect = true
      wx.showToast({
        title: '收藏收藏',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存储到缓存中
    wx.setStorageSync('collect',collect)
    // 5 需改data中的属性 isCollect
    this.setData({
      isCollect
    })
  }
});
