const app = getApp();
import api from '../../api/api.js';
const conf = {
    data: {
        left_Data:["模拟攒机","手机","笔记本电脑","平板电脑","超极本","摄像机","大家电",
        "装机硬件","数码产品","硬件外设","台式整机","智能穿戴","厨卫电器","移动电源","无线路由器",
        "办公打印","游戏机","掌上游戏机","汽车电子","剃须刀","空气净化器","企业产品"],
        left_select_row:0,
        right_idArray:[0,57,16,702,790,0,0,0,0,0,0,0,0,688,227,0,590,591,0,432,406,0],
        right_Data:[],
        right_Data_abc:[],
        showHead:false,
        sectionTitle:[],
        noNetData:["模拟攒机","排行榜","我的配置单"]
    },
    onLoad:function () {

    },
    left_chose:function (e) {
        var self = this,
            dataset = e.currentTarget.dataset;
        self.setData({
            left_select_row:dataset.id
        });
        if(self.data.right_idArray[dataset.id] != 0) {
            self.requestData(self,self.data.right_idArray[dataset.id]);
            self.setData({
                showHead:true
            });
        } else {
            var nonetData = [];
            if(dataset.id == 0) {
                nonetData = ["模拟攒机","排行榜","我的配置单"];
            } else if (dataset.id == 5) {
                nonetData = ["数码相机","镜头","数码摄像机","拍立得"];
            } else if (dataset.id == 6) {
                nonetData = ["平板电视","空调","冰箱","洗衣机"];
            } else if (dataset.id == 7) {
                nonetData = ["显卡","CPU","主板","机箱","固态硬盘","内存","硬盘","电源","DIY组装电脑","散热器","声卡","光驱"];
            } else if (dataset.id == 8) {
                nonetData = ["耳机","MP3","蓝牙音响","U盘","移动硬盘","电子书","电子教育","录音笔","MP4","麦克风","摄像头"];
            } else if (dataset.id == 9) {
                nonetData = ["液晶显示器","音响","鼠标","键盘","键鼠套装"];
            } else if (dataset.id == 10) {
                nonetData = ["台式电脑","一体电脑"];
            } else if (dataset.id == 11) {
                nonetData = ["智能手表","智能手环","智能眼镜"];
            } else if (dataset.id == 12) {
                nonetData = ["抽油烟机","电热水器","煤气灶"];
            } else if (dataset.id == 15) {
                nonetData = ["多功能一体机","打印机","扫描仪","传真机","投影机","复印机"];
            } else if (dataset.id == 18) {
                nonetData = ["行车记录仪","导航仪","DVD导航","雷达预警仪","倒车雷达"];
            } else if (dataset.id == 21) {
                nonetData = ["服务器","交换机","路由器","防火墙","NAS网络存储"];
            }
            self.setData({
                right_Data:[],
                right_Data_abc:[],
                showHead:false,
                noNetData:nonetData
            });
        }
    },
    requestData: function (self,id) {
        app.requestData(api.price + id,{},(err,data) => {
            console.log(data);
            var sectionTitle = Object.keys(data.abc);
           
           
            self.setData({
                right_Data:data.rank,
                right_Data_abc:data.abc,
                sectionTitle:sectionTitle
            });
        });
    },
    //对数据进行提取
    dataRead:function (data) {
        //用于存储提取后的容器数据
        var dataArr = [];
        data.forEach(function(item) {
            //用于存放单条数据
            var paramsData = {};
            paramsData.goodId = item.id;
            paramsData.name = item.name;
            paramsData.picUrl = item.picUrl;
            dataArr.push(paramsData);
        });
        return dataArr;
    }
};
Page(conf);