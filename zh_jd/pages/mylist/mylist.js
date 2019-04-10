//获取应用实例
var sliderWidth = 60; // 需要设置slider的宽度，用于计算中间位置
var app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    ruzhu: [],
    modalHidden: true,
    tabs: ["待支付", "待入住", "已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    userInfo: {},
    hidden: true,
    modalHidden: true,
    quxiaodingdan: false,
    shanchu: true,
    shanHidden: true,
    // 状态开关
    aruzhu: false,
    azhifu: false,
    awancheng: false,
    all:false,
    // 下拉加载
    page: 1
  },
  // 点击支付
  submitPlay: function(e) {
    var that = this
    var order_id = e.currentTarget.dataset.order
    app.util.request({
      'url': 'index/Pay/wxpay',
      data: {
        order_id: order_id
      },
      "method": "post",
      success: function(res) { //后端返回的数据
        console.log(res)
        var data = res.data;
        wx.requestPayment({
          timeStamp: data['timeStamp'],
          nonceStr: data['nonceStr'],
          package: data['package'],
          signType: data['signType'],
          paySign: data['paySign'],
          success: function(res) {
            if (res.errMsg == "requestPayment:ok") {
              that.onLoad()
              wx.navigateTo({
                url: '../yuding/yuding',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
            wx.showModal({
              title: '支付成功',
              content: '',
            })

          },
          fail: function(res) {

          }
        })
      }
    })
  },
  m_call: function() {
    wx.makePhoneCall({
      phoneNumber: '8888888' // 仅为示例，并非真实的电话号码
    })
  },
  onLoad: function() {
    var that = this;
    that.setData({
      activeIndex: 0,
      sliderOffset: 0,
    })
    wx.getSystemInfo({
      success: function(res) {
        if (that.data.activeIndex == 0) {
          var index = 1;
        } else {
          index = that.data.activeIndex;
        }
        that.setData({
          sliderLeft: (res.windowWidth / (that.data.tabs.length + 1) - sliderWidth) / 2,
          sliderOffset: res.windowWidth / (that.data.tabs.length + 1) * index
        });
      }
    });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      ruzhu:[]
    });
    
    reload(this, e.currentTarget.id, 1)
  },
  // 下拉刷新
  onPullDownRefresh() {
    var that = this
    that.onLoad()
    wx.stopPullDownRefresh();
  },
  // 上拉加载
  onReachBottom: function() {
    this.setData({
      page: this.data.page + 1
    })
    reload(this, this.data.option, this.data.page)
  },
  one_list: function() {
    wx.navigateTo({
      url: '../onelist/onelist',
    })
  },
  modalBindcancel: function(e) {
    var that = this;
    that.setData({
      modalHidden: true,
    })
  },
  // 发表评价
  goPayment: function(e) {
    var order_id = e.currentTarget.dataset.order
    wx.navigateTo({
      url: 'comment?order_id=' + order_id,
    })
  },

  details: function(e) {
    var that = this
    var order_id = e.currentTarget.dataset.xid
    var order = that.data.ruzhu
    for (var i = 0; i < order.length; i++) {
      if (order[i].id == order_id) {
        wx: wx.navigateTo({
          url: 'details?order_id=' + order_id
        })
      }
    }

  },
  modalChange: function() {
    this.setData({
      modalHidden: true,
      quxiaodingdan: true,
      shanchu: false
    })
  },
  modalcancel: function() {
    this.setData({
      modalHidden: true
    })
  },
  shanChange: function() {
    this.setData({
      shanHidden: true,
      quxiaodingdan: false,
      shanchu: true
    })
  },
  shancancel: function() {
    this.setData({
      shanHidden: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    reload(that, 0, 1)
  },
});
// 请求
function reload(e, option, page) {
  var that = e;
  var times = Date.parse(new Date())

  var isLogin = wx.getStorageSync("is_lgoin")
  that.setData({
    isLogin: isLogin,
    option: option
  })
  var status = "0"
  switch (option) {
    case "all":
      status = "all"
      break
    case "0":
      status = 0
      break
    case "1":
      status = 1
      break
    case "2":
      status = 4
      break
  }
  // 获取订单列表
  if (isLogin) {
    that.setData({
      times: times
    })
    app.util.request({
      'url': 'index/Order/getUserOrder',
      'cachetime': '0',
      data: {
        status: status,
        page: page
      },
      success: function(res) {
        var ruzhu = res.data.data
        var times = String(that.data.times).slice(0, 10)
        if(ruzhu.length!=0){
          that.setData({
           all:true
          })
        }
        times = parseInt(times)
        for (var i = 0; i < ruzhu.length; i++) {
          ruzhu[i].expire_time = parseInt((ruzhu[i].expire_time - times) / 60)
          if (ruzhu[i].status === 0) {
            that.setData({
              azhifu: true
            })
          }
          if (ruzhu[i].status == 1) {
            that.setData({
              aruzhu: true
            })
          }
          if (ruzhu[i].status == 4) {
            that.setData({
              awancheng: true
            })
          }
        }
        if (that.data.page != 1) {
          var tmp = that.data.ruzhu;
          console.log(tmp,"要添加的数据")
          for (var i = 0; i < ruzhu.length; i++) {
            tmp.push(ruzhu[i]);
          }
          that.setData({
            ruzhu: tmp,
          })
        }else{
          that.setData({
            ruzhu: ruzhu,
          })
        }
      },
    })
  } else {
    that.setData({
      ruzhu: []
    })
  }
}