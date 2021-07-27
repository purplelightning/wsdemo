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

//提取发票函数 isDidi是否是滴滴发票
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

//获取发票全部信息
const getAllBillInfo = (data, isDidi) => {
  //姓名name,regCode发票代码, regNumber发票号码，开票日期：billDate，校验码6为judgeCode，税号 orgNum，班组 group
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

  let regDate = /20(.){8}日/, billDate=''
  if(isDidi){
    let dateArr = regDate.exec(data)
    if(dateArr && dateArr.length){
      billDate = dateArr[0].replace(/\D/g, '-')
      billDate = billDate.slice(0,billDate.length-1)
    }
  }else{
    regDate = /20\d{2}\s+\d{2}\s+\d{2}\r/
    let dateArr = regDate.exec(data)
    if(dateArr && dateArr.length){
      billDate = dateArr[0].replace(/\s+/g, '-')
      billDate = billDate.slice(0,billDate.length-1)
    }
  }
  
  let regJudge = /\d{5}\s{1,2}\d{5}\s{1,2}\d{5}\s{1,2}\d{5}/, judgeCode = ''
  let judgeArr = regJudge.exec(data)
  if(judgeArr && judgeArr.length){
    let b = judgeArr[0].split(/\s{1,2}/).join('').slice(14,21)
    judgeCode= b
  }

  let regOrg = /9\d{15}X7/, orgNum = ''
  let orgArr = regOrg.exec(data)
  if(orgArr && orgArr.length){
    orgNum = orgArr[0]
  }

  if(codeOfPiao && numberOfPiao && billDate && judgeCode && orgNum){
    return {
      codeOfPiao,
      numberOfPiao,
      billDate,
      judgeCode,
      orgNum,
      group: '舆情产品组'
    }
  }
  return ''
}


const basicHeader = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
  'sec-ch-ua-mobile': '?0',
}

module.exports = { formatDate, formatDate1, getUsefulInfo, getAllBillInfo, basicHeader }