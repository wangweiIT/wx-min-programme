const baseURL = "https://api.zbztb.cn/api/public/v1";
// 同时发送异步代码的次数
let ajaxNum = 0;
export const request = parmas => {
  wx.showLoading({
    title: "加载中...",
    mask: true
  });
  ajaxNum++;
  return new Promise((resolve, reject) => {
    wx.request({
      ...parmas,
      url: baseURL + parmas.url,
      success: result => {
        resolve(result.data.message);
      },
      fail: err => {
        reject(err);
      },
      // 无论成功或者失败都会触发
      complete: () => {
        ajaxNum--;
        if (ajaxNum === 0) {
          // 关闭正在加载中的loading
          wx.hideLoading();
        }
      }
    });
  });
};
