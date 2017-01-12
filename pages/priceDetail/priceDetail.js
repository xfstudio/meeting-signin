const app = getApp();
import api from "../../api/api.js";
const conf = {
    data:{
        dataList:[],
        page : 1,
        before_id:'',
        after_id:'',
        ht:[],
        pr:[],
        hotId:[1,14,4,3,5,11],
        priceId:['noPrice',0,500,1000,1500,2000,3000,4000],
        htopen:false,
        propen:false,
        navs:false,
        hotDefault:'热门',
        priseDefault:'价格',
        typeDefault:'品牌',
        choseDefault:'筛选',
        hot_choseIndex : 0,
        price_choseIndex: 0,
        isfull:false,
        isAll:0,
        chose:0
    },
    onLoad:function (params) {
        console.log(params.before_id  +  params.after_id + 'isalll' + params.isAll);
        var self = this;
        self.setData({
            before_id:params.before_id,
            isAll : params.isAll,
            ht : ["热门","最新","价高","价低","点评","销量"],
            pr : ["不限","500以下","500-1000","1000-1500","1500-2000","2000-3000","3000-4000"]
        });
        if(params.isAll == 1) {
            self.setData({
               after_id:params.after_id
            });
        }
        self.requestData(self)
    },
    requestData: function(self) {
        if(self.data.isAll == 0) {
            app.requestData(api.priceAll + self.data.before_id +'&page=' + self.data.page + '&orderBy=' + self.data.hotId[self.data.hot_choseIndex] + '&priceId=' + self.data.priceId[self.data.price_choseIndex],{},(err,data) => {
            console.log(data);
            if(self.data.page == 1) {
                 self.setData({
                     dataList:data.data
                 });
            } else {
                self.setData({
                    dataList:self.data.dataList.concat(data.data)
                });
            }
        });
        } else {
            app.requestData(api.priceDetail + 'subcateId=' + self.data.before_id + '&manuId=' + self.data.after_id +'&page=' + self.data.page + '&orderBy=' + self.data.hotId[self.data.hot_choseIndex] + '&priceId=' + self.data.priceId[self.data.price_choseIndex] ,{},(err,data) => {
            console.log(data);
            if(self.data.page == 1) {
                 self.setData({
                     dataList:data.data
                 });
            } else {
                self.setData({
                    dataList:self.data.dataList.concat(data.data)
                });
            }
        });
      }
    },
    hot_action: function(e) {
        var s;
        if(this.data.htopen) {
            s = false;
        } else {
            s = true;
        }
        this.setData({
            chose: 1,
            navs:s,
            isfull:s,
            htopen:!this.data.htopen,
            propen:false
        });
    },
    price_action: function(e) {
        var s;
        if(this.data.propen) {
            s = false;
        } else {
            s = true;
        }
        this.setData({
            chose: 2,
            navs:s,
            isfull:s,
            propen:!this.data.propen,
            htopen:false
        });
    },
    type_action: function(e) {
        this.setData({
            chose: 3
        });
    },
    chose_action: function(e) {
        this.setData({
            chose: 4
        });
    },
    //热门
    hot_type:function (e) {
        var dataset = e.currentTarget.dataset;
        var s;
        if(this.data.htopen) {
            s = false;
        } else {
            s = true;
        }
        this.setData({
            hot_choseIndex:dataset.choseindex,
            htopen:!this.data.htopen,
            navs:s,
            isfull:s,
            hotDefault:this.data.ht[dataset.choseindex]
        });
        var self = this;
        self.requestData(self);
    },
    //价格
    price_type: function (e) {
        var dataset = e.currentTarget.dataset;
        console.log(dataset.choseindex);
        var s;
        if(this.data.propen) {
            s = false;
        } else {
            s = true;
        }
        this.setData({
            price_choseIndex:dataset.choseindex,
            propen:!this.data.propen,
            navs:s,
            isfull:s,
            priseDefault:this.data.pr[dataset.choseindex]
        });
        var self = this;
        self.requestData(self);
        console.log(this.data.price_choseIndex);
    },
    hidebg : function () {
        this.setData({
            isfull:false,
            htopen:false,
            propen:false,
            navs:false
        });
    },
    loadMore : function (e) {
        var self = this;
        self.setData({
            page : self.data.page + 1
        });
         self.requestData(self);
    }
};
Page(conf);