Page({
  data: {
    genderArray: ['男', '女', '性别不限'],
    contactArray:['微信','电话','均可'],
    months: [],
    days: [],
    timeslots:['8:15~9:50','10:05~11:40','13:00~14:35','14:45~16:20','18:00~19:35','18:00~20:30'],
    value: [0, 0, 0]
  },
  onLoad: function () {
    //初始化月日信息
    const months = [];
    const days = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i+'月');
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i+'日');
    }
    this.setData({
      months: months,
      days: days
    });
  },
  TimeslotsChange: function (e) {
    const val = e.detail.value;
    console.log(val);
  },
  genderChange: function(e) {
    const index = e.detail.value;
    const selectedGender = this.data.genderArray[index];
    this.setData({
      selectedGender: selectedGender
    });
  },
  contactChange:function(e){
    const index = e.detail.value;
    const selectedcontact = this.data.contactArray[index];
    this.setData({
      selectedcontact: selectedcontact
    });
  },
  Timechange:function(e){
    const index = e.detail.value;
    const selectedtime = this.data.TimeArray[index];
    this.setData({
      selectedtime: selectedtime
    });
  },

  onShareAppMessage() {
    return {};
  },

});