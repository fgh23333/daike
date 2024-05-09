const db = wx.cloud.database()
Page({
  data: {
    classid:"",
    classData:''
  },

  onLoad: function(options) {
    if (options.itemId) {
      const itemId = decodeURIComponent(options.itemId);
      console.log('接收到的itemId:', itemId);
      this.setData({
        classid: itemId
      });
      // 根据itemId执行相应逻辑
    }
    db.collection("orderForm").where({
      "_id":this.data.classid
    }).get({
      success: (res) => {
        this.setData({

          classData : res.data[0]
        });}
      })

  },

  someFunction: function(event) {
    // 自定义函数处理
  },
  
});