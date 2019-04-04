const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    parameter: {},
    page: 1,
    room_list: '',
    recommend:'',
    vip: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var isLogin = wx.getStorageSync("is_lgoin")
    var vip = wx.getStorageSync("users");
    if (vip) {
      vip = vip.member.value == 10 ? 1 : vip.member.value * 0.1
      console.log(vip, "我的vip")
    }
    this.setData({
      isLogin: isLogin,
      vip: vip
    })
    //首页进来的条件，要缓存
    if (options.save == 1) {
      delete options.save;
      wx.setStorageSync("parameter", options);
    }
    if (options.name != undefined) {
      this.setData({
        name: options.name
      })
    }
    this.setData({
      parameter: wx.getStorageSync("parameter"),
    })
    if (options.order_id) {
      this.data.parameter.order_id = options.order_id;
    }
    //位置
    if (options.tourist_id) {
      this.data.parameter.tourist_id = options.tourist_id;
    }
    if (options.saixuan) {
      var saixuan = JSON.parse(options.saixuan);
      this.data.parameter.room_num = saixuan.room_num;
      this.data.parameter.room_price = saixuan.room_price;
      this.data.parameter.room_type = saixuan.room_type;
      if (saixuan.bed_num > 0) {
        this.data.parameter.bed_num = saixuan.bed_num;
      }
      if (saixuan.people_num > 0) {
        this.data.parameter.people_num = saixuan.people_num;
      }

    }
    request(this);
  },
  jumpDetails: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../yuanzi_details/yuanzi_details?id=' + id
    })
  },
  // 搜索
  searchList: function(e) {
    var value = e.detail.value
    this.data.parameter.name = value;
    if (value != ""){
      request(this);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    if(this.data.isList){
      recommend(that, 1);
    }else{
      request(that, 1);
    }
    that.setData({
      page: 1
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      page: this.data.page + 1
    })
    if(this.data.isList){
      recommend(this, this.data.page);
    }else{
      request(this, this.data.page);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})

function request(e, page = 1) {
  if (!e.data.parameter.seller_id) {
    e.data.parameter.city = wx.getStorageSync("city");
  }
  e.data.parameter.page = page;
  app.util.request({
    'url': 'index/Accommoda/getBywhereAccommoda',
    'cachetime': '0',
    data: e.data.parameter,
    success: function(res) {
      if (res.data.success == 1) {
        var res = res.data.data;
        if (e.data.page != 1) {
          var tmp = e.data.room_list;
          for (var i = 0; i < res.length; i++) {
            tmp.push(res[i]);
          }
          e.setData({
            room_list: tmp,
            isList: false
          })
        } else {
          e.setData({
            room_list: res,
            isList: false
          })
        }
      } else if (res.data.success == 0) {
        if (e.data.page == 1) {
          e.setData({
            room_list: [],
            isList: true
          })
          recommend(e)
        } else {
          wx.showToast({
            title: '暂时无更多数据',
            icon: 'none',
            duration: 1000,
            mask: true,
          })
        }
      }
    },
  })
}

function recommend(e, page = 1) {
  if (!e.data.parameter.seller_id){
    e.data.parameter.city = wx.getStorageSync("city");
  }

  e.data.parameter.page = page;
  e.data.parameter.is_not = 1;
  app.util.request({
      'url': 'index/Accommoda/getBywhereAccommoda',
      'cachetime': '0',
      data: e.data.parameter,
      success: function(res) {
        if (res.data.success == 1) {
          var res = res.data.data;
          if (e.data.page != 1) {
            var tmp = e.data.recommend;
            for (var i = 0; i < res.length; i++) {
              tmp.push(res[i]);
            }
            e.setData({
              recommend:tmp,
              isList: true
            })
          } else {
            e.setData({
              recommend: res,
              isList: true
            })
          }
        } else {
          wx.showToast({
            title: '暂时无更多数据',
            icon: 'none',
            duration: 1000,
            mask: true,
          })
        }
      }
    })
}