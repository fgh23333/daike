Page({
  data: {
    genderArray: ['男', '女', '性别不限'],
    contactArray:['微信','电话','均可'],
    monthDayTime: [[], [], ['8:15~9:50','10:05~11:40','13:00~14:35','14:45~16:20','18:00~19:35','18:00~20:30']], // 存储月、日、时间段的数据
    value: [0, 0, 0], 
    timeslots:['8:15~9:50','10:05~11:40','13:00~14:35','14:45~16:20','18:00~19:35','18:00~20:30'],
    switchValue2: true
  },


  onLoad: function () {
    this.initData();
  },

  initData: function () {
    let months = [];
    let days = [];

    // 初始化月份数据
    for (let i = 1; i <= 12; i++) {
      months.push(i < 10 ?  i+'月' : i+'月');
    }
    this.setData({ 'monthDayTime[0]': months });

    // 初始化某个月的最大天数（以当前月为例）
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i < 10 ?  i +'日': i+'日');
    }
    this.setData({ 'monthDayTime[1]': days });
  },

  showPicker: function () {
    
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value: e.detail.value
    });
  },

  // onShareAppMessage() {
  //   return {};
  // },

});