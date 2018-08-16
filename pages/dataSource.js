
  var source = [
    {
      "icon": "/pages/images/icon.jpg",
      "date": "nav 11:30",
      "conImage": "/pages/images/page1.png",
      "content": "但是杰拉德酸辣粉哈来的舒服哈上来合法的时间"
    },
    {
      "icon": "/pages/images/icon.jpg",
      "date": "nav 11:30",
      "conImage": "/pages/images/page1.png",
      "content": "萨顶顶你啦；时间到了；阿斯加德；啦就收到了；啊就是；看到了就啊了；闪电借款撒就大是大hi u 我都会 iu 大陆的；阿圣诞节啊；"
    }
  ]
  

 function getStars(starCount) {
 
   var count = starCount.substring(0,1)
   var stars = [];
   for (var i = 0;i<5;i++){
     if (i < count){
       stars.push(1);
     }else{
       stars.push(0);
     }
   }
   return stars;
}

  module.exports = {
    sourceKey: source,
    getStars: getStars,
  }
 
