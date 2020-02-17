const baseURL = "https://api.zbztb.cn/api/public/v1";
// 同时发送异步代码的次数
let ajaxNum = 0;
export const request = parmas => {
  // 判断url中是否带有 /my/ 请求的是私有路径  带上 header token
  let header = {...parmas.header}
  if (parmas.url.includes("/my/")) {
    // 拼接 header 带上token
    header["Authorization"] = wx.getStorageSync('token');
  }
  wx.showLoading({
    title: "加载中...",
    mask: true
  });
  ajaxNum++;
  return new Promise((resolve, reject) => {
    debugger
    wx.request({
      ...parmas,
      header,
      url: baseURL + parmas.url,
      success: result => {
        debugger
        resolve(result.data.message || {});
      },
      fail: err => {
        reject(err);
      },
      // 无论成功或者失败都会触发
      complete: () => {
        debugger
        ajaxNum--;
        if (ajaxNum === 0) {
          // 关闭正在加载中的loading
          wx.hideLoading();
        }
      }
    });
  });
};
