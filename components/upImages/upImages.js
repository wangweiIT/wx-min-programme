// components/upImages/upImages.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击图片的删除图标，删除
    handleRemoveImg(e) {
      const { removeimg } = e.currentTarget.dataset;
      console.log(removeimg);
      this.triggerEvent("removeImg", removeimg);
    }
  }
});
