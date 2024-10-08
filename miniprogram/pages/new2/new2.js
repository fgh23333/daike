const timestartlist=[
  {
    timestr:"8:15",
    timehour:8,
    timeminute:15
  },
  {
    timestr:"9:05",
    timehour:9,
    timeminute:5
  },
  {
    timestr:"10:05",
    timehour:10,
    timeminute:5
  },
    {
    timestr:"10:55",
    timehour:10,
    timeminute:55
  },
  {
    timestr:"13:00",
    timehour:13,
    timeminute:0
  },
    {
    timestr:"13:50",
    timehour:13,
    timeminute:50
  },
  {
    timestr:"14:45",
    timehour:14,
    timeminute:45
  },
    {
    timestr:"15:35",
    timehour:15,
    timeminute:35
  },
  {
    timestr:"18:00",
    timehour:18,
    timeminute:0
  },
    {
    timestr:"18:50",
    timehour:18,
    timeminute:50
  },
    {
    timestr:"19:40",
    timehour:19,
    timeminute:40
  },
    {
    timestr:"20:35",
    timehour:20,
    timeminute:35
  }
];
const  timeendlist=[
  {
    timestr:"9:00",
    timehour:9,
    timeminute:0
  },
  {
    timestr:"9:50",
    timehour:9,
    timeminute:50
  },
    {
    timestr:"10:50",
    timehour:10,
    timeminute:50
  },
    {
    timestr:"11:40",
    timehour:11,
    timeminute:40
  },
    {
    timestr:"13:45",
    timehour:13,
    timeminute:45
  },
    {
    timestr:"14:35",
    timehour:14,
    timeminute:35
  },
    {
    timestr:"15:30",
    timehour:15,
    timeminute:30
  },
    {
    timestr:"16:20",
    timehour:16,
    timeminute:20
  },
    {
    timestr:"18:45",
    timehour:18,
    timeminute:45
  },
    {
    timestr:"19:35",
    timehour:19,
    timeminute:35
  },
    {
    timestr:"20:25",
    timehour:20,
    timeminute:25
  },
    {
    timestr:"21:20",
    timehour:21,
    timeminute:20
  }
]

Page({
  data: {
    genders: ['男', '女', '性别不限'],
    contactArray:['微信','电话','均可'],
    monthDayTime: [[], [], ['8:15~9:50','10:05~11:40','13:00~14:35','14:45~16:20','18:00~19:35','18:00~20:30']], // 存储月、日、时间段的数据
    value: [0, 0, 0], 
    timeslots:['8:15~9:50','10:05~11:40','13:00~14:35','14:45~16:20','18:00~19:35','18:00~20:30'],
    switchValue2: true,
    selecttime:""
  },
  onChange(event) {
    this.setData({
      selecttime:timestartlist[event.detail.value[0]].timestr+" - "+timeendlist[event.detail.value[1]].timestr
    })
  },
   /** 跳转到首页页面 */
   jumpToAssuse() {
    wx.showModal({
        title: '提示',
        content: '是否确认提交',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
                wx.showToast({
                    title: '成功',
                    duration: 1000,
                    success: function () {
                    setTimeout(function () {
                    wx.reLaunch({
                    url: 'pages/home/home',
                      })
                    }, 1000);
                 }
               })
                                                        
            }else{
               console.log('用户点击取消')
            }

        }
    })
},
  // 下面是性别选择
  genderChange: function(e) {
    const selectedGender = this.data.genders[e.detail.value];
    this.setData({
      selectedGender: selectedGender,
    });
  },
  //以下选择联系方式
  contactChange:function(e){
    const selectedcontact = this.data.contactArray[e.detail.value];
    this.setData({
      selectedcontact: selectedcontact,
    });
  },
  onLoad: function () {
    this.initData();
    this.setData({
      selecttime:timestartlist[5].timestr+" - "+timeendlist[6].timestr
    })
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

  bindMultiPickerChange: function (e) {
    const multiIndex = this.detail.value;
    let selectedtime = this.data.monthDayTime.map((column, index) => {
      return column[multiIndex[index]];
    });
    this.setData({
      multiIndex: e.detail.value,
      selectedtime:selectedtime,
    });
  },

  // onShareAppMessage() {
  //   return {};
  // },

});