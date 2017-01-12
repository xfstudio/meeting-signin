function createRequestUrl(action, weid, rid, mod) {
  weid = weid ? 0 + weid : 10;
  rid = rid ? 0 + rid : 73;
  action = action ? '' + action : 'qd_post';
  mod = mod ? '' + mod : 'meepo_bigerwall';
  return remote + '/app/index.php?i=' + weid + '&c=entry&rid=' + rid + '&do=' + action + '&m=' + mod;
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
  formatTime: formatTime
}
