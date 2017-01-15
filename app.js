//app.js
var util = require('utils/util.js')
App({
  globalData:{
    userInfo: null,
    access_token: null,
    apiSigninUrl: 'https://alifa.gg/app/index.php?i=10&c=entry&rid=73&m=meepo_bigerwall&do=',
    apiUrl: 'https://api-test.alijian.net/index.php?r=',
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res_user) {
                that.globalData.userInfo = res_user.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)              
                wx.request({
                  url: that.globalData.apiUrl + 'user/wx-small-login',
                  method: 'POST',
                  data: {
                    code: res.code,
                    iv: res_user.iv,
                    encryptedData: res_user.encryptedData              
                  },
                  header: {
                        'content-type': 'application/x-www-form-urlencoded'  //application/json
                  },
                  success: function(user) {
                    console.log(user)
                    if(user.access_token){
                      that.globalData.access_token = user.access_token
                      // that.globalData.userInfo = user.data
                      // typeof cb == "function" && cb(that.globalData.userInfo)
                      wx.showToast({
                        title:"登录成功",
                        duration: 1500
                      });
                    }
                  },
                  fail: function(e) {
                    console.log(e)                    
                    wx.showToast({
                      title:"登录失败",
                      duration: 1500
                    });
                  },
                })
                wx.request({
                  url: that.globalData.apiSigninUrl + 'qd_post',
                  data: {
                    sign_words : '祝阿里健2017年会圆满成功',
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
                              title:"系统登录成功",
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
    }
  },
  requestData:function(url,params,callback) {
    wx.request({
      url: url,
      data: params,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'Content-Type':'application/json'}, // 设置请求的 header
      success: function(res){
        callback(null,res.data);
      },
      fail: function(e) {
        callback(e)
      }
    })
  }
})