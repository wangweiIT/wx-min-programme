/* 
 promise 形式的getSetting
*/
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: result => {
        console.log(result);
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

/* 
 promise 形式的chooseAddress
*/
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

/* 
 promise 形式的openSetting
*/
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

/* 
 promise 形式的showModal 只要是回调的，都可以进行封装
*/
export const showModal = parmas => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...parmas,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
/* 
 promise 形式的showToast 只要是回调的，都可以进行封装
*/
export const showToast = parmas => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      ...parmas,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
/* 
 promise 形式的 login 只要是回调的，都可以进行封装
*/
export const  login = parmas => {
  return new Promise((resolve, reject) => {
    wx.login({
      ...parmas,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  });
};

/* 
 promise 形式的 requestPayment 只要是回调的，都可以进行封装
*/
export const  requestPayment = parmas => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...parmas,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  });
};
