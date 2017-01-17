//index.js
var app = getApp();
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        isHideLoading: false,
        signinText: "一键签到",
        msgSendText: "发弹幕",
        isSignined: false,
        isHideMsgPicker: true,
        signinContent: null,
        signinContents: app.globalData.signinContents
    },
    initData: function() {
        var that = this
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo,
                isHideLoading: true,
                isHideMsgPicker: true,
                // signinContents: app.globalData.signinContents,
                signinContent: that.data.signinContents[3]
            });
        });
    },
    onLoad: function() {
        var that = this
        setTimeout(function() {
            that.initData();
        }, 1500);
        console.log("onLoad");
    },
    
    onSignin: function(e){
        var that = this
        if(that.data.isSignined){
            //调用登录接口
            wx.login({
                success: function (res) {
                if (res.code) {
                    wx.getUserInfo({
                        success: function (res_user) {
                            wx.request({
                                url: that.globalData.apiSigninUrl + 'qd_post',
                                data: {
                                    sign_words : util.getRandomFromArray(that.data.signinContents),
                                    code : res.code,
                                    userinfo : res_user.userInfo                 
                                },
                                header: {
                                        'content-type': 'application/x-www-form-urlencoded'  //application/json
                                },
                                success: function(data) {
                                        console.log(data)
                                        if(data.openid){
                                            wx.showToast({
                                            title:"签到成功",
                                            duration: 1500
                                        });
                                    }
                                }
                            })
                        },
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
                }
            })
            
            return;
        }
        that.setData({
            isHideLoading: false,
        });
        setTimeout(function(){
            that.setData({
                isHideLoading: true,
                signinText: "签到成功，关注大屏幕抽奖",
                isSignined: true
            });
            wx.showToast({
                title:"签到成功",
                duration: 1500
            });
            that.signined = true;
            console.log(that);
        },500);
    },
    onMsgSend: function(e){
        var that = this
        that.setData({
            isHideMsgPicker: false,
            msgSendText: "选择祝福语"
        });      
        // wx.showToast({
        //     title:"选择祝福语",
        //     duration: 3000
        // });
    },
    bindMsgSend: function(e){
        var that = this
        const val = e.detail.value
        that.setData({
            signinContent: that.data.signinContents[val[0]]
        })
        util.bgMsgSend()

        wx.showToast({
            title:"弹幕发送成功     请关注大屏幕",
            duration: 3000
        });
        that.setData({
            isHideMsgPicker: true,
            signinText: "发弹幕"
        });
    },
    onScan: function(e){
        wx.scanCode({
            success: function(res){
                var result = JSON.stringify(res)
                util.bgSignin()
                wx.showToast({
                    title:"签到成功",
                    duration: 1500
                });
                // wx.showModal({
                //     title:"扫码结果",
                //     content:result,
                //     duration: 1500
                // });
            },
            fail: function(e){

            }
        })
    },
    
    onShowTip: function(){
        wx.showToast({
            title:"点击右上角“···”执行操作",
            duration: 5000
        });
    },
    onReady: function(){
        console.log("onReady");
    },
    onHide: function(){
        console.log("onHide");
    },
    onShow:function(){
        console.log("onShow");
    },
    onUnload:function(){
        console.log("onUnload");
    },
    onShareAppMessage: function(e){
        wx.showToast({
            title:"share everything",
            duration: 1500
        });
        return {

        }
    }

})
