const db = wx.cloud.database()
Page({
  data: {
    username: "靳取",
    userid: "b787f7c3662f8ef800060bd76e2f1643",
    today: "",
    allDate: true,
    thedate: {
      year: 0,
      month: 0,
      day: 0,
      string: ""
    },
    ifshowdate: {
      "left": false,
      "right": true
    },
    choosedate: (new Date()).getTime(),
    location: "上海海洋大学",
    userimg: "https://onlineimg.alni.eu.org/raw/homepage/head.jpg",
    selecttime: "全时段",
    timeslots: ['全时段', '8:15~9:50', '10:05~11:40', '13:00~14:35', '14:45~16:20', '18:00~19:35', '18:00~20:30'],
    sexlist: ['所有', '男', '女', '性别不限'],
    selectsex: "所有",
    selectSortType: "时间顺序",
    sortList: ["时间顺序", "时间倒序", "价格降序", "价格升序"],
    show: false,
    chooseclass: {},
    formList: "",
    ifLoading: 0,
    origndata: "",
    testdate: "1"
  },
  zeroTransform(num) {
    if (num === 0) {
      return "00";
    } else if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  },
  transformData() {
    let myList = new Array();
    this.data.origndata.forEach((value, index, arr) => {
      let thesex = "";
      if (value.needSex === 0) {
        thesex = "女";
      } else if (value.needSex === 1) {
        thesex = "男";
      } else {
        thesex = "不限";
      }
      myList.push({
        "id": value._id,
        index: index,
        "date": value.classStartTime.getFullYear() + "-" + (value.classStartTime.getMonth() + 1) + "-" + value.classStartTime.getDate(),
        "time": this.zeroTransform(value.classStartTime.getHours()) + ":" + this.zeroTransform(value.classStartTime.getMinutes()) + "-" + this.zeroTransform(value.classEndTime.getHours()) + ":" + this.zeroTransform(value.classEndTime.getMinutes()),
        "classname": value.className,
        "postTime": value.postTime.getFullYear() + "-" + (value.postTime.getMonth() + 1) + "-" + value.postTime.getDate() + " " + this.zeroTransform(value.postTime.getHours()) + ":" + this.zeroTransform(value.postTime.getMinutes()) + ":" + this.zeroTransform(value.postTime.getSeconds()),
        "money": value.price,
        "sex": thesex,
        "detail": value.detail,
        "classroom": value.classroom,
        "postUser": value.postUser,
        "needQuestion": value.needQuestion
      })
    });
    if (myList.length <= 0) {
      this.setData({
        formList: "",
        ifLoading: 0
      })
    } else {
      this.setData({
        formList: myList,
        ifLoading: 0
      })
    }

  },
  getdate() {
    this.setData({
      ifLoading: 1,
      formList: ""
    });
    if (this.data.allDate) {
      var sdata = new Date();
      var edata = new Date(2100, 12, 31, 23, 59, 59);

    } else {
      var sdata = new Date(this.data.thedate.year, this.data.thedate.month - 1, this.data.thedate.day, 0, 0, 0);
      var edata = new Date(this.data.thedate.year, this.data.thedate.month - 1, this.data.thedate.day, 23, 59, 59);

    }
    var thesex = {
      "st": 0,
      "ed": 2
    };
    if (this.data.selectsex === "男") {
      thesex.st = 1;
      thesex.ed = 1;
    }
    if (this.data.selectsex === "女") {
      thesex.st = 0;
      thesex.ed = 0;
    }
    if (this.data.selectsex === "性别不限") {
      thesex.st = 2;
      thesex.ed = 2;
    }

    db.collection("orderForm").where({
      classStartTime: {
        $gte: sdata,
        $lte: edata
      },
      needSex: {
        $gte: thesex.st,
        $lte: thesex.ed
      }
    }).get({
      success: res => {
        console.log(res.data);
        this.setData({
          origndata: res.data
        });
        this.transformData();
      }

    })
  },
  choosethedate() {
    this.setData({
      allDate: false
    });
    this.getdate();
  },
  allthedate() {
    this.setData({
      allDate: true
    })
    this.getdate();
  },
  showPopup() {
    console.log(111);
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  handleDateChange(e) {
    const dateStr = e.detail.value; // 获取日期字符串
    const dateParts = dateStr.split('-'); // 分割日期字符串
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // 注意JavaScript中的月份是从0开始的
    const day = parseInt(dateParts[2], 10);

    const selectedDate = new Date(year, month, day);
    if (selectedDate.getTime() > (new Date()).getTime()) {
      this.setData({
        ifshowdate: {
          "left": true,
          "right": true
        }
      });
    } else {
      this.setData({
        ifshowdate: {
          "right": true,
          "left": false
        }
      });
    }
    this.setData({
      allDate: false,
      choosedate: selectedDate,
      thedate: {
        year: year,
        month: month + 1,
        day: day,
        string: year.toString() + "-" + (month + 1).toString() + "-" + day.toString()
      }
    });
    this.getdate();
  },
  handleItemClick: function (e) {
    // 通过 e.currentTarget.dataset.item 获取到传递的参数
    var clickedItem = e.currentTarget.dataset.item;
    wx.showLoading({ // 显示加载中loading效果 
      title: "加载中...",
      mask: true //开启蒙版遮罩
    });
    db.collection("users").where({
      "_id": clickedItem.postUser
    }).get({
      success: (res) => {
        clearTimeout(timeout); // 清除定时器，表示请求成功
        clickedItem['postUsername'] = res.data[0].username;
        clickedItem['postUserimg'] = res.data[0].userImgUrl;
        this.setData({
          chooseclass: clickedItem
        });
        wx.hideLoading();
        this.showPopup();
      },
      fail: (err) => {
        wx.hideLoading();
        // 这里可以处理查询失败的情况
        console.error('数据库查询失败', err);
      }
    });

    const timeout = setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '加载超时',
        icon: 'none',
      });
      // 这里可以添加更多的超时处理逻辑
    }, 3000);



    // wx.navigateTo({
    //   url: `/pages/detail/detail?itemId=${encodeURIComponent(clickedItem.id)}`, // 通过URL传递参数
    // });
  },
  goToPublish: function () {
    wx.switchTab({
      url: '/pages/new2/new2'
    });
  },
  goToMy: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  onShareAppMessage() {
    return {};
  },
  handleSelectorChange: function (e) {
    const index = e.detail.value;
    const selectedGender = this.data.timeslots[index];
    this.setData({
      selecttime: selectedGender
    });
    this.getdate();
  },
  sexChange: function (e) {
    const index = e.detail.value;
    const selectedGender = this.data.sexlist[index];
    this.setData({
      selectsex: selectedGender
    });
    this.getdate();
  },
  sortChange: function (e) {
    const index = e.detail.value;
    const selectedGender = this.data.sortList[index];
    this.setData({
      selectSortType: selectedGender
    });
    this.getdate();
  },
  nextDay: function () {
    var date = new Date(this.data.choosedate);
    var nowdate = new Date();
    var ifshow = this.data.ifshowdate;
    date.setDate(date.getDate() + 1);
    if (date.getTime() > nowdate.getTime()) {
      ifshow.left = true;
    }
    this.setData({
      choosedate: date,
      ifshowdate: ifshow,
      thedate: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        string: date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString()
      }
    });
    this.getdate();
  },
  upDay: function () {
    var date = new Date(this.data.choosedate);
    var ifshow = this.data.ifshowdate;
    if (date.getTime() > new Date().getTime()) {

      date.setDate(date.getDate() - 1);
      if (date.getTime() < new Date().getTime()) {
        ifshow.left = false;
      }

      this.setData({
        choosedate: date,
        ifshowdate: ifshow,
        thedate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          string: date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString(),
        }
      });
      this.getdate();
    }
  },
  onLoad: function () {
    // 获取当前日期
    var currentDate = new Date();
    // 将当前日期设置到页面数据中
    this.setData({
      choosedate: currentDate,
      thedate: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        string: currentDate.getFullYear().toString() + "-" + (currentDate.getMonth() + 1).toString() + "-" + currentDate.getDate().toString()
      },
      allDate: true,
      ifloading: 1,
      today: currentDate.getFullYear().toString() + "-" + (currentDate.getMonth() + 1).toString() + "-" + currentDate.getDate().toString()
    });
    this.getdate();
  }
});