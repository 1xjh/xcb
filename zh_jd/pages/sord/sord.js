// zh_jd/pages/sord/sord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:[
        { id: 1, name: "推荐排序"},
        { id: 2, name: "好评优先"},
        { id: 3, name: "价格低到高" },
        { id: 4, name:"价格高到低" },
      ],
      xuanxiang:""
  },
  sordTab:function(e){
   
    var id =  e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../details/details?order_id='+id,
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