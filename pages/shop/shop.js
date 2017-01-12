import api from '../../api/api.js'
const app = getApp()

const conf = {
    data: {
        focusImage:[],
        typeTitle:[],
        floorInfo:[]
    },
    onLoad:function () {
       app.requestData(api.shop,{},(err,data) => {
           this.setData({
               focusImage:data.info.focusInfo,
               typeTitle:data.info.entranceLink,
               floorInfo:data.info.floorInfo
           })
       }) 
    }
};
Page(conf);