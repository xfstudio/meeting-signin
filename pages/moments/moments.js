//moments.js
var app = getApp();
var util = require('../../utils/util.js')
var cityData = require('../../utils/city.js');

// page/one/index.js
Page({
  data:{
    content: [],
    nv: [],
    px: [],
    qyopen:false,
    qyshow:false,
    nzopen:false,
    pxopen:false,
    nzshow:false,
    pxshow:false,
    isfull:false,
    cityleft: cityData.getCity(),
    citycenter: {},
    cityright: {},
    select1: '',
    select2:'',
    shownavindex:'',
    perPage: 10,
    curPage: 1,
    isHideLoading: false,
    momentsList: []
  },
  onLoad: function(){
    var that = this;
    that.setData({
      gq:['所有','供','求'],
      nv:['人脉','合作','产品','项目','其他'],
      px:['默认排序','离我最近','费用最低','费用最高']
    })
    that.getMomentsList(that.data.curPage)
    that.setData({
        isHideLoading: true
    });
  },
  onShow: function(){
        
  },
  getMomentsList: function(page) {
        var that = this;
        var list = [];
        wx.request({
            url: app.globalData.apiUrl + 'match/index',
            method: 'GET',
            data: {
                city_id : 5101,
                page: page,
                per_page: that.data.perPage,
                reward_as: 0              
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
                        momentsList: data.list
                    });
                }
            }
        })        
    },
  listqy: function(e){
    if(this.data.qyopen){
      this.setData({
        qyopen:false,
        nzopen:false,
        pxopen:false,
        nzshow:true,
        pxshow:true,
        qyshow:false,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        qyopen:true,
        pxopen:false,
        nzopen:false,
        nzshow:true,
        pxshow:true,
        qyshow:false,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
    
  },
  list: function(e){
    if(this.data.nzopen){
      this.setData({
        nzopen:false,
        pxopen:false,
        qyopen:false,
        nzshow:false,
        pxshow:true,
        qyshow:true,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.gq,
        nzopen:true,
        pxopen:false,
        qyopen:false,
        nzshow:false,
        pxshow:true,
        qyshow:true,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
  },
  list: function(e){
    if(this.data.nzopen){
      this.setData({
        nzopen:false,
        pxopen:false,
        qyopen:false,
        nzshow:false,
        pxshow:true,
        qyshow:true,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.nv,
        nzopen:true,
        pxopen:false,
        qyopen:false,
        nzshow:false,
        pxshow:true,
        qyshow:true,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
  },
  listpx: function(e){
    if(this.data.pxopen){
      this.setData({
        nzopen:false,
        pxopen:false,
        qyopen:false,
        nzshow: true,
        pxshow:false,
        qyshow:true,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.px,
        nzopen:false,
        pxopen:true,
        qyopen:false,
        nzshow: true,
        pxshow:false,
        qyshow:true,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
  selectleft: function(e){

    this.setData({
      cityright:{},
      citycenter:this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2:''
    });
  },
  selectcenter: function(e){
    
    this.setData({
      cityright:this.data.citycenter[e.currentTarget.dataset.city],
      select2: e.target.dataset.city
    });
  },
  hidebg: function(e){

    this.setData({
      qyopen:false,
      nzopen:false,
      pxopen:false,
      nzshow:true,
      pxshow:true,
      qyshow:true,
      isfull:false,
      shownavindex: 0
    })
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