const fs = require('fs');

const getAllBillInfoByQrcode = (arr) => {
  //姓名name,regCode发票代码, regNumber发票号码，开票日期：billDate，校验码6为judgeCode，
  // 税号 orgNum，班组 group, 发票类型 billType
  console.log(arr);
  let codeOfPiao = arr[2], numberOfPiao = arr[3], billType = arr[1], orgNum = '9132050508781783X7'
  let judgeCode = arr[6].slice(-6)
  let billDateArr = arr[5].split('')
  billDateArr.splice(6,0,'/')
  billDateArr.splice(4,0,'/')
  let billDate = billDateArr.join('')
  return {
    billType,
    codeOfPiao,
    numberOfPiao,
    billDate,
    judgeCode,
    orgNum,
    group: '舆情产品组'
  }
}

//获取发票全部信息
const getAllBillInfo = (data, isDidi) => {
  console.log(data)
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
      billDate = dateArr[0].replace(/\D/g, '/')
      billDate = billDate.slice(0,billDate.length-1)
    }
  }else{
    regDate = /20\d{2}\s+\d{2}\s+\d{2}\r/
    let dateArr = regDate.exec(data)
    console.log(dateArr)
    if(dateArr && dateArr.length){
      billDate = dateArr[0].replace(/\s+/g, '/')
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

const deleteDirFunc = (path) => {
  let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
              deleteDirFunc(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
        console.log('删除成功')
    }
}

const addContent = (content) => {
  const container = document.querySelector('#container')
  const ele = document.createElement('div')
  ele.innerText = content
  container.appendChild(ele)
}

export default { getAllBillInfo, addContent, getAllBillInfoByQrcode, deleteDirFunc }