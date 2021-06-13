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

// isDidi是否是滴滴发票
const getUsefulInfo = (data, isDidi) => {
  let regCode = isDidi ? /\n0\d{11}\n/ : /\n0\d{11}\r/, codeOfPiao=''
  let regNumber = isDidi ? /\n\d{8}\n/ : /\n\d{8}\r/, numberOfPiao = ''
  let codeArr = regCode.exec(data)
  if(codeArr && codeArr.length){
    codeOfPiao = codeArr[0].slice(1,13)
  }
  let numberArr = regNumber.exec(data)
  if(numberArr && numberArr.length){
    numberOfPiao = numberArr[0].slice(1,9)
  }
  if(codeOfPiao && numberOfPiao){
    return codeOfPiao+'_'+numberOfPiao
  }
  return ''
}

module.exports = { formatDate, formatDate1, getUsefulInfo }