const APP = getApp();
import API from '../../api/api.js';
import utils from '../../utils/util.js';
const conf = {
    data: {
        newHeadList:["头条","热榜","订阅","新闻","手机","攒机","评测","电脑","导购","优购","视频","外设","直播","图赏","游戏"],
        headSelect:0,
        selectId:1,
        dataList:[],
        pics:[],
        page:1,
        scroll_xvalue:0,
        scrollTop:0
    },
    onLoad:function () {
        var self = this;
        wx.getSystemInfo({  //获取屏幕宽度
          success: function(res) {
              self.setData({
                  main_width :  res.windowWidth
              });
          }
        });
        self.requestData(self);
    },
    requestData:function (self) {
        var time = utils.formatTime(new Date),
            page = self.data.page;
            console.log('slectid' + self.data.selectId);
        APP.requestData(API.newList + 'v=11.0&class_id=' + self.data.selectId + '&isReviewing=NO&last_time=' + time + '&page=' + page + '&retina=2&vs=iph501',{},(err,data) => {
            console.log(data);
            var datalist;
            if(self.data.page == 1) {
                datalist = data.list;
            } else {
                datalist = self.data.dataList.concat(data.list);
            }
            self.setData({
                dataList:datalist,
                pics:data.pics
            });
        });
    },
    headAction:function (e) {
        var self = this;
        var dataset = e.currentTarget.dataset,
            main_width = self.data.main_width;
        var choseID;
        if(dataset.id == 0) {
             choseID = 1;
        } else if (dataset.id == 1) {
             choseID = 8;
        } else {
             choseID = 1;
        }
        console.log('choseid' + choseID);
         self.setData({
            scroll_xvalue: parseInt(dataset.id) * main_width,   //设置距离左边的位置
            headSelect:dataset.id,
            selectId:choseID,
            page : 1
        });
         self.requestData(self);
    },
    loadMore:function () {
        var self = this,
            page = self.data.page + 1;
        self.setData({
            page: page
        });
        self.requestData(self);
    },
    scrollEvent: function(e) {
        console.log( e.detail);
        var self = this,
            scrol_x = e.detail.scrollLeft;  
        var main_width = self.data.main_width,  //屏幕宽度
            beishu;      
        beishu = scrol_x / main_width + 1;  //距离左边的位置
        console.log('应该滚动到的位置' + parseInt(beishu) * main_width);
        self.setData({
            scroll_xvalue:parseInt(beishu) * main_width    //设置距离左边的位置
        });
        console.log('实际在的位置' + e.detail.scrollLeft);
    }
};
Page(conf);