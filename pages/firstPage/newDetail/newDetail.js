  var app = getApp();
  var re = app.globalData.source;

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
    console.log(re);
    var index = options.index;
    this.data.currentIndex = index;
    var status = wx.getStorageSync('status')
    
    if(status){
      var sta = status[index];
      this.setData({
        status:sta
      })
    }else{
      status = {};
      status[index] = false;
      wx.setStorageSync('status', status);
    }
  },

  saveTap: function(event){
    var status = wx.getStorageSync('status');
    var index = this.data.currentIndex;
    var sta = status[index];
    sta= !sta;
    status[index] = sta;
    this.setData({
      status: sta
    })
    console.log(this.data.status)
    wx.setStorageSync('status', status);
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