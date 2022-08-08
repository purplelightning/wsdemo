const fs = require('fs');

const getAllBillInfoByQrcode = (arr) => {
  //姓名name,regCode发票代码, regNumber发票号码，开票日期：billDate，校验码6为judgeCode，
  // 税号 orgNum，班组 group, 发票类型 billType
  let codeOfPiao = arr[2], numberOfPiao = arr[3], billType = '--', orgNum = '9132050508781783X7'
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

const addCheckContent = (content, flag) => {
  const container = document.querySelector('#check-container')
  const ele = document.createElement('div')
  ele.innerText = content
  ele.style.marginBottom = '5px'
  if(flag){
    ele.style.color = 'red'
  }
  container.appendChild(ele)
}

export const formatTime = () => {
  let now = new Date()
  let month = (now.getMonth() + 1 + '').padStart(2, '0')
  let day = ('' + now.getDate()).padStart(2, '0')
  let hour = ('' + now.getHours()).padStart(2, '0')
  let minute = ('' + now.getMinutes()).padStart(2, '0')
  let second = ('' + now.getSeconds()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}|${hour}:${minute}:${second}`
}

export default { addContent, addCheckContent, getAllBillInfoByQrcode, deleteDirFunc }