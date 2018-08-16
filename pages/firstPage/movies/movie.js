var app = getApp();
var g_data = require("../../dataSource.js");
var network = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // douban.uieee.com
    // api.douban.com
    var nows = app.globalData.httpDress + "/v2/movie/in_theaters" + "?start=0&count=3"
    var wills = app.globalData.httpDress + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250 = app.globalData.httpDress + "/v2/movie/top250" + "?start=0&count=3"
    this.getRequest(wills, 1);
    this.getRequest(nows, 0);
    this.getRequest(top250, 2);

  },
  // 发起数据请求
  getRequest: function(url, bid) {
    var that = this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function(res) {

        if (bid == 0) {
          //获取正在上映数据 
          var nows = that.getNowsData(res.data);
          that.setData({
            ntitle: res.data.title,
            nows: nows

          });
        } else if (bid == 1) {
          //获取即将上映数据
          var wills = that.getNowsData(res.data);
          that.setData({
            wtitle: res.data.title,
            wills: wills


          });
        } else if (bid == 2) {
          //获取 top250数据
          var top250s = that.getNowsData(res.data);
          that.setData({
            ptitle: res.data.title,
            top250s: top250s

          });
        }

      }
    })
  },
  // 跳转到更多电影页面
  pushMovieDetail: function(event){
    var title = event.currentTarget.dataset.title;
     wx.navigateTo({
       url: 'movieDetail/movieDetail?title=' + title,
       success: function(res) {
       },
       fail: function(res) {},
       complete: function(res) {},
     })
  },
  // 获取请求数据
  getNowsData: function(nowsData) {
    var objs = [];

    for (var idx in nowsData.subjects) {
      var obj = nowsData.subjects[idx];
      if (obj.title.length > 6) {
        obj.title = obj.title.substring(0, 6) + "...";
      }


      var subject = {
        stars: g_data.getStars(obj.rating.stars),
        title: obj.title,
        average: obj.rating.average,
        large: obj.images.large,
        id: obj.id
      }
      objs.push(subject);
    }
    return objs;
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})