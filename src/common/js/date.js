//时间的格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '')).substr(4 - RegExp.$1.length);
  }
  let o = {
    'M+': date.getMonth() + 1,//月是从0开始计算的,要加1
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {//构造正则表达式
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
    }
  }
  return fmt;
}
//若为一位数左边补0,否则不变,,设置月份
function padLeftZero(str) {
  return ('00'+str).substr(str.length);
}
