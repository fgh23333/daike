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
    selectSortType:"时间顺序",
    sortList:["时间顺序","时间倒序","价格降序","价格升序"],
    show:false,
    chooseclass:{},
    formList:[
      {
        "id": "111",
        "date":"2024-4-28",
        "time":"8:15-9:50",
        "classname":"高等数学",
        "money":"35",
        "sex":"不限",
        "detail":"一段测试文字。一段测试文字。一段测试文字。一段测试文字。一段测试文字。一段测试文字。",
        "classroom":"1102"
      },
      {
        "id": "222",
        "time":"10:05-11:40",
        "classname":"程序设计",
        "money":"25",
        "sex":"男",
        "detail":"",
        "classroom":"1103"
      },
      {
        "id": "333",
        "time":"13:00-14:35",
        "classname":"英语视听说",
        "money":"45",
        "sex":"女",
        "detail":"",
        "classroom":"1109"
      },
      {
        "id": "444",
        "time":"8:15-9:50",
        "classname":"高等数学",
        "money":"35",
        "sex":"不限",
        "detail":"",
        "classroom":"1102"
      },
      {
        "id": "555",
        "time":"10:05-11:40",
        "classname":"程序设计",
        "money":"25",
        "sex":"男",
        "detail":"",
        "classroom":"1101"
      },
      {
        "id": "666",
        "time":"13:00-14:35",
        "classname":"英语视听说",
        "money":"45",
        "sex":"女",
        "detail":"",
        "classroom":"1103"
      },
    ],
  },
  showPopup() {
    console.log(111);
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  handleDateChange(e) {
    this.setData({
      choosedate: e.detail.value
    });
  },
  handleItemClick: function(e) {
    // 通过 e.currentTarget.dataset.item 获取到传递的参数
    let clickedItem = e.currentTarget.dataset.item;
    console.log('点击的 item 是：', clickedItem);
    this.setData({
      chooseclass : clickedItem
    });
    this.showPopup();
    // wx.navigateTo({
    //   url: `/pages/detail/detail?itemId=${encodeURIComponent(clickedItem.id)}`, // 通过URL传递参数
    // });
  },
  goToPublish: function() {
    console.log('goToPublish');
    wx.switchTab({
      url: '/pages/new2/new2'
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
  sortChange: function(e) {
    const index = e.detail.value;
    const selectedGender = this.data.sortList[index];
    this.setData({
      selectSortType: selectedGender
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