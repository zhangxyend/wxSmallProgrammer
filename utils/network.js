 function http (url,callback) {
 
  wx.request({
    url: url, //仅为示例，并非真实的接口地址

    header: {
      'content-type': 'application/xml' // 默认值
    },
    success: function (res) {
      callback(res.data);
    }
  })
}
module.exports = {
  http: http
}
