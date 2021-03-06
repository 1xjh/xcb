// zh_jd/pages/feedback/feedback.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidePlaceholder: false,
    value:"",
  },
  // textarea 输入时触发
  getTextareaInput: function (e) {
    var that = this;
    that.setData({
      value:e.detail.value
    })
    if (e.detail.cursor > 0) {
      that.setData({
        isHidePlaceholder: true
      })
    } else {
      that.setData({
        isHidePlaceholder: false
      })
    }
  },
  sumbit:function(){
    var that = this
    app.util.request({
      'url': 'index/Tool/feedback',
      'cachetime': '0',
      data: { feedback_content:that.data.value },
      success: function (res) {
        console.log(res)
        if (res.data.success == 1){
        wx.navigateTo({
          url: 's_feedback',
        })
      }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})