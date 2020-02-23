/* 
 1 输入框绑定 值改变事件  input 事件
   1.1 获取输入框的值
   1.2 合法性判断
   1.3 检验通过 把输入值 发送的后台
  2 防抖 （防止抖动） 定时器
   1 定义全局的定时器 id 
*/
const regeneratorRuntime = require("../../lib/runtime/runtime.js");
const app = getApp();
// 获取请求 request
const request = app.globalData.request;
Page({
  data: {
    goods: [],
    // 取消的按钮是否显示
    isFocus: false,
    // 输入框的值
    inputVal: ""
  },
  TimeId: -1,
  // 输入框的值改变触发的事件
  handleInput(e) {
    // console.log(e);
    // 1 获取输入框的值
    debugger;
    const { value } = e.detail;
    // 2 检测合法性
    if (!value.trim()) {
      // 不合法 重置
      this.setData({
        goods: [],
        isFocus: false
      });
      return;
    }
    this.setData({
      isFocus: true
    });
    // 3 准备发送请求数据 防抖
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  // 点击取消按钮
  cancel() {
    this.setData({
      inputVal: "",
      goods: [],
      isFocus: false
    });
  },
  //  发送请求，获取搜索数据
  async qsearch(query) {
    let res = await request({ url: "/goods/qsearch", data: { query } });
    // console.log(res);
    this.setData({
      goods: res
    });
  }
});
