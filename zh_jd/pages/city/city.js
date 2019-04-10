var city = require('../../utils/city.js');
var app = getApp()
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    arr: [],
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "",
    hotcityList:[]
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    var that =this
    app.util.request({
      'url': 'index/Info/getHomeSet',
      'cachetime': '0', //缓存时间 秒
      data: {
        "city": wx.getStorageSync("city")
      },
      success: function (res) {
        that.setData({
          hotcityList: res.data.data.hot_city
        })
      },
    })

    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var cityA = []
    var cityB = []
    var cityName = []
    for (var i = 0; i < cityList.length; i++) {
      cityA.push(cityList[i])
    }
    for (var i = 0; i < cityA.length; i++) {
      cityB.push(cityA[i].cityInfo)
    }
    for (var i = 0; i < cityB.length; i++) {
      for (var a = 0; a < cityB[i].length; a++) {
        cityName.push(cityB[i][a].city)
      }
    }
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    that.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList,
      cityName: cityName
    })

  },
  // 搜索
  searchList: function (e) {
    var cityName = this.data.cityName
    var value = e.detail.value
    if (value.length != 0) {
      var arr = [];
      for (var i = 0; i < cityName.length; i++) {
        if (cityName[i].match(value) != null) {
          arr.push(cityName[i]);
        }
      }
      this.setData({
        arr: arr
      })
      if(arr.length!=0){
        this.setData({
          input:true
        })
      }
    } else {
      this.setData({
        arr: [],
        input:false
      })
    }
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    console.log("bindCity")
    this.setData({ city: e.currentTarget.dataset.city })
    wx.reLaunch({
      url: "../index/index?city=" + e.currentTarget.dataset.city,
    })
  },
  //选择热门城市
  bindHotCity: function (e) {
    this.setData({
      city: e.currentTarget.dataset.city
    })
    wx.reLaunch({
      url: "../index/index?city=" + e.currentTarget.dataset.city,
    })
  },
  //选择收搜城市
  bindInput: function (e) {
    this.setData({
      city: e.currentTarget.dataset.item
    })
    wx.reLaunch({
      url: "../index/index?city=" + e.currentTarget.dataset.item,
    })
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
})
// //先引用城市数据文件
// var city = require('../../utils/city.js')
// var lineHeight = 0;
// var endWords = "";
// var isNum;
// Page({
//   data: {
//     remen:["肇庆","广州","戈阳","珠海"],
//     "hidden": true,
//     cityName: "", //获取选中的城市名

//   },
//   onLoad: function (options) {
//     // 生命周期函数--监听页面加载
//   },

//   onReady: function () {
//     // 生命周期函数--监听页面初次渲染完成
//     var cityChild = city.City[0];
//     var that = this;
//     wx.getSystemInfo({
//       success: function (res) {
//         lineHeight = (res.windowHeight - 100) / 22;
//         // console.log(res.windowHeight - 100)
//         that.setData({
//           city: cityChild,
//           winHeight: res.windowHeight - 40,
//           lineHeight: lineHeight
//         })
//       }
//     })
//   },
//   onShow: function () {
//     // 生命周期函数--监听页面显示

//   },
//   onHide: function () {
//     // 生命周期函数--监听页面隐藏

//   },
//   onUnload: function () {
//     // 生命周期函数--监听页面卸载

//   },
//   //触发全部开始选择
//   chStart: function () {
//     this.setData({
//       trans: ".3",
//       hidden: false
//     })
//   },
//   //触发结束选择
//   chEnd: function () {
//     this.setData({
//       trans: "0",
//       hidden: true,
//       scrollTopId: this.endWords
//     })
//   },
//   //获取文字信息
//   getWords: function (e) {
//     var id = e.target.id;
//     this.endWords = id;
//     isNum = id;
//     this.setData({
//       showwords: this.endWords
//     })
//   },
//   //设置文字信息
//   setWords: function (e) {
//     var id = e.target.id;
//     this.setData({
//       scrollTopId: id
//     })
//   },

//   // 滑动选择城市
//   chMove: function (e) {
//     var y = e.touches[0].clientY;
//     var offsettop = e.currentTarget.offsetTop;
//     var height = 0;
//     var that = this;
//     ;
//     var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
//     // 获取y轴最大值
//     wx.getSystemInfo({
//       success: function (res) {
//         height = res.windowHeight - 10;
//       }
//     });

//     //判断选择区域,只有在选择区才会生效
//     if (y > offsettop && y < height) {
//       // console.log((y-offsettop)/lineHeight)
//       var num = parseInt((y - offsettop) / lineHeight);
//       endWords = cityarr[num];
//       // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
//       that.endWords = endWords;
//     };


//     //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
//     //DOTO 这里暂时还有问题，还是比较卡，待优化
//     if (isNum != num) {
//       // console.log(isNum);
//       isNum = num;
//       that.setData({
//         showwords: that.endWords
//       })
//     }
//   },
//   //选择城市，并让选中的值显示在文本框里
//   bindCity: function (e) {
//     var cityName = e.currentTarget.dataset.city;
//     this.setData({ cityName: cityName })
//     wx.reLaunch({
//       url: "../index/index?city="+cityName,
//     })
//   },
//   cityName:function(e){
//     var cityName = e._relatedInfo.anchorRelatedText
//     this.setData({ cityName: cityName })

//     wx.reLaunch({
//       url: "../index/index?city=" + cityName,
//     })
//   }

// })