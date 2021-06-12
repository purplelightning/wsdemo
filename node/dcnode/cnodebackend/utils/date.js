const formatDate = (t = new Date()) => {
  let month = t.getMonth()+1
  month = month<10 ? '0'+ month : month
  let date = t.getDate()
  date = date < 10 ? '0' + date : date
  let hour = t.getHours()
  hour = hour < 10 ? '0' + hour : hour
  let minute = t.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  let second = t.getSeconds()
  second = second < 10 ? '0' + second : second
  return `${t.getFullYear()}-${month}-${date} ${hour}:${minute}:${second}`
}

const formatDate1 = (t = new Date()) => {
  let month = t.getMonth()+1
  month = month<10 ? '0'+ month : month
  let date = t.getDate()
  date = date < 10 ? '0' + date : date
  let hour = t.getHours()
  hour = hour < 10 ? '0' + hour : hour
  let minute = t.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  let second = t.getSeconds()
  second = second < 10 ? '0' + second : second
  return `${t.getFullYear()}${month}${date}-${hour}${minute}${second}`
}

module.exports = { formatDate, formatDate1 }