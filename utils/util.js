function createRequestUrl(action, weid, rid, mod) {
  var apiUrl = 'https://alifa.gg/app/index.php?i=10&c=entry&rid=73&m=meepo_bigerwall&do=';
  var weid = weid ? 0 + weid : 10
  var rid = rid ? 0 + rid : 73
  var action = action ? '' + action : 'qd_post'
  var mod = mod ? '' + mod : 'meepo_bigerwall'
  return apiUrl + '/app/index.php?i=' + weid + '&c=entry&rid=' + rid + '&do=' + action + '&m=' + mod
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

module.exports = {
  formatTime: formatTime,
  createRequestUrl: createRequestUrl
}
