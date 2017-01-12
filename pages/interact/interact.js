import API from '../../api/api.js';
const app = getApp();
const conf = {
    data: {
        page:1,
        headTitle:['推荐','手机','摄影','电脑','软件','家电'],
        bbsidArray:['','sjbbs','dcbbs','nbbbs','diybbs','otherbbs'],
        choseIndex:0,
        scrollTop:0,
        dataArray:[],
        isfull:false,
        isChose:'',
        rightOpen:false,
        indentifier:false
    },
    onLoad:function() {
        var self = this;
        self.request(self);
    },
    request:function (self) {
        var url;
        if(self.data.choseIndex == 0) {
            url = API.interact + 'page=' + self.data.page;
        } else if(self.data.choseIndex == 5) {
            url = API.interact + 'page=' + self.data.page + '&boardid=19&bbsid=' + self.data.bbsidArray[self.data.choseIndex];
        } else {
            url = API.interact + 'page=' + self.data.page + '&bbsid=' + self.data.bbsidArray[self.data.choseIndex];
        }
         app.requestData(url,{},(err,data) => {
             console.log(data);
             if(self.data.page == 1) {
                  self.setData({
                      dataArray:data.postList
                  });
             } else {
                  self.setData({
                     dataArray:self.data.dataArray.concat(data.postList) 
                  });
             }
        });
    },
    headchose:function(e) {
        var self = this;
        var dataset = e.currentTarget.dataset;
        if(dataset.right == 1) {
            this.setData({
                choseIndex:dataset.index,
                page : 1,
                scrollTop:0,
                isChose:'0',
                isfull:false,
                rightOpen:false
            });            
        } else {
            this.setData({
                 choseIndex:dataset.index,
                 page : 1,
                 scrollTop:0
            });
        }
        
        self.request(self);
    },
    loadMore:function () {
        var self = this;
        self.setData({
            page:self.data.page + 1
        });
        self.request(self);
    },
    rightAction:function(e) {
        console.log('移动右键');
        this.setData({
            isChose:1,
            isfull:true,
            rightOpen:true
        })
    },
    hidebg:function () {
        this.setData({
            isChose:'0',
            isfull:false,
            rightOpen:false
        })  
    }
};
Page(conf);