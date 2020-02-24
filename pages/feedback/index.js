/* 
 1 点击 + 按钮 触发tap点击事件
  1 调用小程序内置的 选中图片的 api
  2 获取到 图片的路径 数组
  3 把图片路径 存到 data 的变量中
  4 页面就可以根据 图片数组 循环显示  自定义组件

 2 点击 自定义图片 组件
  1 获取被点击的元素的索引
  2 获取 data 中的图片数组
  3 根据索引删除 数组对应的元素
  4 把数组重新设置回 data 中去

 3 点击 提交
  1 获取文本域的内容
   1.1 data 中定义变量 表示 输入框内容
   1.2 文本域 绑定 输入事件
  2 对这些内容 合法性验证
  3 验证通过 用户选择的图片上传到专门的图片服务器中，返回外网链接
  4 文本域 和 外网图片路径 一起提交到服务器
  5 清空当前页面
  6 返回上一页

*/
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    // 被选中的图片路径数组
    chooseImages: [],
    // 文本域的内容
    textVal: "",
    // 全局的定时器
    intervalTime: null
  },
  // 点击 + 选中图片事件
  chooseImags() {
    // 2 调用小程序内置的选中图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片格式 原图 压缩
      sizeType: ["original", "compressed"],
      // 图片来源 相机 相册
      sourceType: ["album", "camera"],
      success: result => {
        // console.log(result);
        this.setData({
          chooseImages: [...this.data.chooseImages, ...result.tempFilePaths]
        });
      }
    });
  },
  // 文本域事件 防抖
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
    clearTimeout(this.data.intervalTime);
    this.data.intervalTime = setTimeout(() => {
      console.log(e);
    }, 1000);
  },
  // 删除图片
  removeImg(e) {
    console.log(e);
    const delImage = e.detail;
    // 从 data.chooseImages中删除该记录
    this.setData({
      chooseImages: this.data.chooseImages.filter(v => v !== delImage)
    });
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
  },
  // 提交按钮点击事件
  handleFormSubmit(e) {
    // 1 获取文本域内容
    const {textVal, chooseImages} = this.data
    // 2 合法性校验
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return
    }
    // 3 上传文件到专门的服务器
    // 上传文件不支持多个文件同时上传 遍历数组  挨个上传
    debugger
    chooseImages.forEach((v, i)=>{
      wx.uploadFile({
        // 图片上传到哪里
        url: 'https://ae01.alicdn.com/kf/',
        // 被上传的文件的路径
        filePath: v,
        // 上传的文件的名称 后台来获取文件 file
        name: 'file',
        // 顺带的文本信息
        formData: {},
        success: (result)=>{
          console.log(result);
          
        }
      });
    })
  }
});
