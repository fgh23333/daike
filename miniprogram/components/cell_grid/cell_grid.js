Component({
    options: { // 组件配置
        addGlobalClass: true,
        // 指定所有 _ 开头的数据字段为纯数据字段
        // 纯数据字段是一些不用于界面渲染的 data 字段，可以用于提升页面更新性能
        pureDataPattern: /^_/, 
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        vtabs: {type: Array, value: []},
    },
    data: {
        currentView: 0,
    },
    observers: { // 监测
        activeTab: function(activeTab) {
            this.scrollTabBar(activeTab);
        }
    }, 
    relations: {  // 关联的子/父组件
        '../vtabs-content/index': {
            type: 'child', // 关联的目标节点应为子节点
            linked: function(target) {
                this.calcVtabsCotentHeight(target);
            },
            unlinked: function(target) {
                delete this.data._contentHeight[target.data.tabIndex];
            }
        }
    },
    lifetimes: { // 组件声明周期
        created: function() {
            // 组件实例刚刚被创建好时
        },
        attached: function() {
            // 在组件实例进入页面节点树时执行
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    methods: { // 组件方法
        calcVtabsCotentHeight(target) {}
    } 
});