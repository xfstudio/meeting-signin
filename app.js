//app.js
// var util = require('utils/util.js')
App({
  globalData:{
    userInfo: null,
    apiUrl: 'https://alifa.gg/app/index.php?i=10&c=entry&rid=73&m=meepo_bigerwall&do=',
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
                  url: that.globalData.apiUrl + 'qd_post',
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