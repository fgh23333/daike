const db = wx.cloud.database()
Page({
  data: {
    username:"靳取",
    userid:"b787f7c3662f8ef800060bd76e2f1643",
    today:"",
    allDate:true,
    thedate:{
      year:0,
      month:0,
      day:0,
      string:""
    },
    ifshowdate:{
      "left": false,
      "right": true
    },
    choosedate: (new Date()).getTime(),
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
    formList:"",
    ifLoading:false,
    origndata:"",
    testformList:[
      {
        "id": "111",
        "date":"2024-4-28",
        "time":"8:15-9:50",
        "classname":"高等数学",
        "money":"35",
        "sex":"不限",
        "detail":"一段测试文字。一段测试文字。一段测试文字。一段测试文字。一段测试文字。一段测试文字。",
        "classroom":"1102",
        "postUser":"b787f7c3662f8ef800060bd76e2f1643"
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
    testdate:"1"
  },
  zeroTransform(num){
    if(num===0){
      return "00";
    }else if(num<10){
      return "0" + num;
    }else{
      return num;
    }
  },
  transformData(){
    let myList = new Array();
    this.data.origndata.forEach((value, index, arr) => {
      let thesex = "";
      if(value.needSex === 0){
        thesex = "女";
      }else if(value.needSex === 1){
        thesex = "男";
      }else{
        thesex = "不限";
      }
      myList.push(
          {
            "id": value._id,
            index: index,
            "date": value.classStartTime.getFullYear() + "-" + (value.classStartTime.getMonth() + 1) + "-" + value.classStartTime.getDate(),
            "time": this.zeroTransform(value.classStartTime.getHours()) + ":" + this.zeroTransform(value.classStartTime.getMinutes()) + "-" + this.zeroTransform(value.classEndTime.getHours()) + ":" + this.zeroTransform(value.classEndTime.getMinutes()),
            "classname": value.className,
            "money": value.price,
            "sex": thesex,
            "detail": value.detail,
            "classroom": value.classroom,
            "postUser": value.postUser,
            "needQuestion": value.needQuestion
          }
      )
    });
    if(myList.length <= 0){
      this.setData({
        formList:"",
        ifLoading:false
      })
    }
    else{
      this.setData({
        formList:myList,
        ifLoading:false
      })
    }

  },
  getdate(){
    this.setData({
      ifLoading:true,
      formList:""
    });
    if(this.data.allDate){
      db.collection("orderForm").get({
        success:res=>{
          this.setData({
            origndata:res.data
          });
          this.transformData();
        }

      })
    }
    else{
      var sdata = new Date(this.data.thedate.year,this.data.thedate.month-1,this.data.thedate.day,0,0,0);
      var edata = new Date(this.data.thedate.year,this.data.thedate.month-1,this.data.thedate.day,23,59,59);
      db.collection("orderForm").where({
        classStartTime: {
          $gte: sdata,
          $lte: edata
        }
      }).get({
        success:res=>{
          console.log(res.data);
          this.setData({
            origndata:res.data
          });
          this.transformData();
        }

      })
    }
  },
  choosethedate(){
    this.setData({
      allDate:false
    });
    this.getdate();
  },
  allthedate(){
    this.setData({
      allDate:true
    })
    this.getdate();
  },
  showPopup() {
    console.log(111);
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  dataUpdata(){
    var nowdate = new Date();
    this.setData({
      ifLoading:true,
      formList:""
    });
    setTimeout(()=>{
      if(this.data.thedate.year==nowdate.getFullYear()&&this.data.thedate.month==nowdate.getMonth()+1&&this.data.thedate.day==nowdate.getDate()){
        this.setData({
          formList:this.data.testformList
        });
      }
      this.setData({
        ifLoading:false,
      });
    },1000)

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
      allDate:false,
      choosedate: selectedDate,
      thedate: {
        year: year,
        month: month + 1,
        day: day,
        string: year.toString()+"-"+(month+1).toString()+"-"+day.toString()
      }
    });
    this.getdate();
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
    wx.switchTab({
      url: '/pages/new2/new2'
    });
  },
  goToMy: function() {
    wx.switchTab({
      url: '/pages/index/index'
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
    this.getdate();
  },
  sexChange: function(e) {
    const index = e.detail.value;
    const selectedGender = this.data.sexlist[index];
    this.setData({
      selectsex: selectedGender
    });
    this.getdate();
  },
  sortChange: function(e) {
    const index = e.detail.value;
    const selectedGender = this.data.sortList[index];
    this.setData({
      selectSortType: selectedGender
    });
    this.getdate();
  },
  nextDay: function() {
    var date =  new Date(this.data.choosedate);
    var nowdate = new Date();
    var ifshow = this.data.ifshowdate;
    date.setDate(date.getDate() + 1);
    if(date.getTime() > nowdate.getTime()){
      ifshow.left = true;
    }
    this.setData({
      choosedate: date,
      ifshowdate:ifshow,
      thedate:{
        year:date.getFullYear(),
        month:date.getMonth()+1,
        day:date.getDate(),
        string:date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()
      }
    });
    this.getdate();
  },
  upDay: function() {
    var date =  new Date(this.data.choosedate);
    var ifshow = this.data.ifshowdate;
    if(date.getTime() > new Date().getTime()){

    date.setDate(date.getDate() - 1);
    if(date.getTime() < new Date().getTime()){
      ifshow.left = false;
    }

    this.setData({
      choosedate: date,
      ifshowdate:ifshow,
      thedate:{
        year:date.getFullYear(),
        month:date.getMonth()+1,
        day:date.getDate(),
        string:date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString(),
      }
    });
      this.getdate();
    }
  },
  onLoad: function() {
    // 获取当前日期
    var currentDate = new Date();
    // 将当前日期设置到页面数据中
    this.setData({
      choosedate: currentDate,
      thedate:{
        year:currentDate.getFullYear(),
        month:currentDate.getMonth()+1,
        day:currentDate.getDate(),
        string:currentDate.getFullYear().toString()+"-"+(currentDate.getMonth()+1).toString()+"-"+currentDate.getDate().toString()
      },
      allDate:true,
      ifloading:true,
      today:currentDate.getFullYear().toString()+"-"+(currentDate.getMonth()+1).toString()+"-"+currentDate.getDate().toString()
    });
    this.getdate();
  }
});