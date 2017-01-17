var app = getApp()

function createRequestUrl(action, weid, rid, mod) {
  var apiUrl = 'https://alifa.gg/app/index.php?i=10&c=entry&rid=73&m=meepo_bigerwall&do=';
  var weid = weid ? 0 + weid : 10
  var rid = rid ? 0 + rid : 73
  var action = action ? '' + action : 'qd_post'
  var mod = mod ? '' + mod : 'meepo_bigerwall'
  return apiUrl + '/app/index.php?i=' + weid + '&c=entry&rid=' + rid + '&do=' + action + '&m=' + mod
}
function bgLogin(url, data, method){
  
}
function bgSigin(user){

}
function bgMsgSend(words){

}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getRandomFromArray(arr){
  var n = Math.ceil(Math.random() * arr.length);
  return arr[n]
}

/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
function date(format, timestamp){  
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    switch (format){
      case 'H:i:s':
        return h  + ':' + m + ':' + s
        break
      case 'm-d H:i:s':
        return M + '-' + D  + ' '+ h  + ':' + m + ':' + s
        break
      case 'Y-m-d H:i:s':
        return Y + '-' + M + '-' + D  + ' '+ h  + ':' + m + ':' + s
        break
      default:
        return Y + '-' + M + '-' + D  + ' '+ h  + ':' + m + ':' + s
        break 
    }      
}

module.exports = {
  date: date,
  formatTime: formatTime,
  createRequestUrl: createRequestUrl,
  getRandomFromArray: getRandomFromArray,
  bgLogin: bgLogin,
  bgSignin: bgSigin,
  bgMsgSend: bgMsgSend,
}
