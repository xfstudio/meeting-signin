// mine.js
var app = getApp();

Page({
    data: {
        userInfo: {},
        isHideLoading: false,
    },
    initData: function() {
        var that = this
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo,
            });
        });
    },
    onLoad: function() {
        var that = this
        setTimeout(function() {
            that.initData();
        }, 1500);
        console.log("onLoad");
    }
})