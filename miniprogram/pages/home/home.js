Page({
  data: {
    username:"靳取",
    userid:100,
    choosedate:"",
    location:"上海海洋大学",
    userimg:"https://onlineimg.alni.eu.org/raw/homepage/head.jpg",
    selecttime:"全时段",
    timeslots:['全时段','8:15~9:50','10:05~11:40','13:00~14:35','14:45~16:20','18:00~19:35','18:00~20:30'],
    sexlist:['男', '女', '性别不限'],
    selectsex:"性别不限",
    formList:[
      {
        "time":"8:15-9:50",
        "classname":"高等数学",
        "money":"35",
        "sex":"不限",
        "detail":""
      },
      {
        "time":"10:05-11:40",
        "classname":"程序设计",
        "money":"25",
        "sex":"男",
        "detail":""
      },
      {
        "time":"13:00-14:35",
        "classname":"英语视听说",
        "money":"45",
        "sex":"女",
        "detail":""
      },
    ],
  },
  handleDateChange(e) {
    this.setData({
      choosedate: e.detail.value
    });
  },

  onShareAppMessage() {
    return {};
  },
  handleSelectorChange: function(e) {
    const index = e.detail.value;
    const selectedGender = this.data.timeslots[index];
    this.setData({
      selecttime: selectedGender
    });
  },
  sexChange: function(e) {
    const index = e.detail.value;
    const selectedGender = this.data.sexlist[index];
    this.setData({
      selectsex: selectedGender
    });
  },
  onLoad: function() {
    // 获取当前日期
    var currentDate = new Date();

    // 将当前日期设置到页面数据中
    this.setData({
      choosedate: currentDate.toLocaleDateString()
    });
  }
});