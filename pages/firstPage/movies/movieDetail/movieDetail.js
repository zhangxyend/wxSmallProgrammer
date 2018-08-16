var app = getApp();
var g_data = require("../../../dataSource.js");
var network = require("../../../../utils/network.js");
var title = "";//标题
var start = 20;//初始页码
var totalMovies = [];//数据源
var isFresh = true;//是否刷新数据
var inputValue = null;
var httpType = null;
var that = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    title = options.title;
    that = this
    this.sendHttp(title, this);
  },
//发送请求
  sendHttp: function (title, that) {
    var url = "";
   if(httpType=="search"){
     url = app.globalData.httpDress + "/v2/movie/search?q={" + inputValue + "}"; 
   }else{
     if (title === "正在上映的电影-北京") {
       url = app.globalData.httpDress + "/v2/movie/in_theaters";
     } else if (title === "即将上映的电影") {
       url = app.globalData.httpDress + "/v2/movie/coming_soon";
     } else if (title === "豆瓣电影Top250") {
       url = app.globalData.httpDress + "/v2/movie/top250";
     }
   }
    network.http(url, that.getData);
    wx.showNavigationBarLoading();
  },

  //请求返回数据
  getData: function (data) {
    var movies = that.getNowsData(data);
      if (isFresh) {
        start = 20;
        if (totalMovies.length > 0) {
          totalMovies.splice(0, totalMovies.length);
        }
      } else {
        start += 20;
      }
    totalMovies = totalMovies.concat(movies);
    that.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading();
  },

  //上拉加载更多
  loaddata: function () {
    var loadurl = "";
    if(httpType=="search"){
      loadurl = app.globalData.httpDress + "/v2/movie/search?q={" + inputValue + "}&start= " + start + " & count=20";
    }else{
      if (title === "正在上映的电影-北京") {
        loadurl = app.globalData.httpDress + "/v2/movie/in_theaters" + "?start=" + start + "&count=20";
      } else if (title === "即将上映的电影") {
        loadurl = app.globalData.httpDress + "/v2/movie/coming_soon" + "?start=" + start + "&count=20";
      } else if (title === "豆瓣电影Top250") {
        loadurl = app.globalData.httpDress + "/v2/movie/top250" + "?start=" + start + "&count=20";
      }
    }
    isFresh = false;
    network.http(loadurl, that.getData);
    wx.showNavigationBarLoading();
  },
  //下拉刷新
  freshdata: function () {
    isFresh = true
    that.sendHttp(title, that);
    
  },
  // 获取请求数据
  getNowsData: function (nowsData) {
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
  onReady: function () {
    wx.setNavigationBarTitle({
      title: title,
    })
  },
  // input 聚焦
  focus: function () {
    httpType = "search";
    this.setData({
      isShowView: true,
    })
  },
  // input 输入
  bindKeyInput: function (event) {
    inputValue = event.detail.value;
  },
  //不聚焦
  change:function(){
    that.sendHttp(title, that);
  },

  //返回更多界面
  backView: function (event) {
    isFresh = true;
    httpType = "";
  
    that.sendHttp(title, that);
    that.setData({
      isShowView: false,
      inputTxt: "",
    })
  },

})