const myselfMessage = [
	"无效操作！",
	"你试图自己给自己代课！",
	"不要啊！不可以！",
	"那你快去上课吧！",
	"不要啊！不可以！",
	"那你快去上课吧！",
	"不要啊！不可以！",
	"那你快去上课吧！",
	"aoa",
	"www"
];

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// 接收父组件传过来的数据
		// 属性名字必须和父组件那边的一样，和vue的prop传参类似
		classData: {
			type: JSON,
			value: ''
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
    tapnumbers:0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		dealit(){
			if(this.data.classData.postUser === 'b787f7c3662f8ef800060bd76e2f1643'){
        this.tapmyself()
			}
    },
		getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    chart(){
      console.log(this.data.classData)
    },
		tapmyself(){
			if(this.data.tapnumbers<10){
				this.setData({
					tapnumbers: this.data.tapnumbers+1
				})
			}
			let randomInt = this.getRandomInt(1, this.data.tapnumbers);
			wx.showToast({
				title: myselfMessage[randomInt],
				icon: 'none',
				duration: 2000
			})

		}

	}
})