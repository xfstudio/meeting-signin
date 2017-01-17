//person.js
var app = getApp();
var util = require('../../utils/util.js')

Page({
    data: {
        signinList: [],
        signinListOld: [],
        isHideLoading: false,
        perPage: 10,
        curPage: 1
    },
    onLoad: function() {
        
    },

    onShow: function() {
        var that = this;
        that.setData({
            isHideLoading: true
        });
        that.getSigninList(that.data.curPage)
    },

    getSigninList: function(page) {
        var that = this;
        var list = [];
        wx.request({
            url: app.globalData.apiUrl + 'match/index',
            method: 'GET',
            data: {
                city_id : 5101,
                page: page,
                per_page: that.data.perPage,               
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',  //application/json
                'X-Access-Token': app.globalData.access_token,
            },
            success: function(res) {
                console.log(res)
                var data = res.data
                if(data.code == 200){                    
                    wx.showToast({
                        title: data.message,
                        duration: 1500
                    });
                    for (var i=0;i<data.list.length;i++) data.list[i].event_at = util.date('m-d H:i:s', data.list[i].event_at)
                    that.setData({
                        signinList: data.list
                    });
                }
            }
        })        
    },

    onShareAppMessage: function(e){
        console.log(e);
    }

})
