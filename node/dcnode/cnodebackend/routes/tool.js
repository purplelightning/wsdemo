const express = require('express');
const router = express.Router()

const { getUsefulInfo, getAllBillInfo } = require('../utils/common');

//上传pdf目录，输出目录
const uploadDir = 'public/files/pdf/'
const outputDir = 'public/files/output/'

const multer = require('multer');
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    var extension = file.originalname.toLowerCase();
    var filename = extension
    cb(null, filename)
  }
})
const pdfUpload = multer({ storage: storage })

const fs = require('fs');
//pdf解析用了两个库
const pdf = require('pdf-parse');

PdfParser = require('pdf2json');
let pdfParser = new PdfParser(this,1)
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

const xlsx = require('node-xlsx');

// router.post('/handlePdf', (req, res) => {
//   let dataBuffer = fs.readFileSync('public/files/pdf/发票.pdf')
//   pdf(dataBuffer).then(data => {
//     let regCode = /\n0\d{11}\n/, codeOfPiao=''
//     let regNumber = /\n\d{8}\n/, numberOfPiao = ''
//     let codeArr = regCode.exec(data.text)
//     if(codeArr && codeArr.length){
//       codeOfPiao = codeArr[0].slice(1,13)
//     }
    
//     let numberArr = regNumber.exec(data.text)
//     if(numberArr && numberArr.length){
//       numberOfPiao = numberArr[0].slice(1,9)
//     }
//     fs.rename(originFile, newFile, (err) => {
//       if(err){
//         console.log(err);
//         res.success({content:content})
//       }else{
//         res.success({url: newFile,content:content})
  
//       }
//     })
//   })
// })

router.post('/uploadBill', pdfUpload.single('ppp'), (req, res) => {
  let originFile = uploadDir + req.file.originalname
  let name = req.file.originalname.split('.')[0]

  let dataBuffer = fs.readFileSync(originFile)
  pdf(dataBuffer).then(data => {
    let beName = getUsefulInfo(data.text, true) // 有，说明可以被pdf-parse处理
    if(beName){
      const newFile = `${outputDir}${beName}_${name}.pdf`
      // fs.writeFile(outputDir+name+'.txt', data.text, ()=>{})
      fs.rename(originFile, newFile, (err) => {
        if(err){
          console.log(err);
        }else{
          res.success({url: newFile,content:data.text})
        }
      })
    }else{// 没有，用pdf2json处理
      pdfParser.on("pdfParser_dataReady", pdfData => {
        let tt =  pdfParser.getRawTextContent();
        let ceName = getUsefulInfo(tt, false)
        const newFile = `${outputDir}${ceName}_${name}.pdf`
        // fs.writeFile(outputDir+name+'.txt', tt, ()=>{})
        fs.rename(originFile, newFile, (err) => {
          if(err){
            console.log(err);
          }else{
            res.success({url: newFile,content:tt})
          }
          pdfParser.destroy()
        })
      });
      pdfParser.loadPDF(originFile)
    }
  })
})

router.post('/handleExcel', (req, res) => {
  // 复制excel
  const obj = xlsx.parse(uploadDir + 'pay.xlsx')
  const excelObj = obj[0].data
  let data = []
  for(let i=0;i<excelObj.length;i++){
    let arr = []
    let tmp = excelObj[i], len =tmp.length
    for(let j=0;j<len;j++){
      if(j===len-1){
        arr.push(tmp[j]+10000)
      }else{
        arr.push(tmp[j])
      }
    }
    data.push(arr)
  }
  let buffer = xlsx.build([{ name: 'sheet1', data: data }])
  fs.writeFileSync(outputDir+'ppp.xlsx', buffer, {'flag': 'w'}, err=>{
    if(err){
      console.log(err);
    }else{
      console.log('写入Excel');
    }
  })
  // 写入excel测试
  var data1 = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
  var buffer1 = xlsx.build([{name: "mySheetName", data: data1}]);
  fs.writeFileSync(outputDir+'b.xlsx', buffer1, 'binary');
})

router.post('/ptoexc', pdfUpload.single('pte'), (req, res) => {
  let originFile = uploadDir + req.file.originalname
  let name = req.file.originalname.split('.')[0]

  let dataBuffer = fs.readFileSync(originFile)
  pdf(dataBuffer).then(data => {
    let ttt = data.text
    let beName = getUsefulInfo(ttt, true)
    if(beName){
      const newFile = `${outputDir}${beName}_${name}.pdf`
      fs.rename(originFile, newFile, (err) => {
        if(err){
          console.log(err);
        }else{
          let fie = getAllBillInfo(ttt, true)
          let data = []
          let tmp = ['行号(必输)', '发票种类代码','发票代码','发票号码','开票日期(格式YYYY/MM/DD)',
          '校验码后六位','购方税号（我公司税号）','班组']
          let val = [1,10,fie.codeOfPiao, fie.numberOfPiao,fie.billDate,fie.judgeCode,fie.orgNum,fie.group]
          data.push(tmp)
          data.push(val)
          let buffer = xlsx.build([{name:'ss',data: data}])
          fs.writeFileSync(outputDir+name+'.xlsx', buffer, 'binary')
          res.success({url: outputDir+name+'.xlsx'})
        }
      })
    }else{
      pdfParser.on("pdfParser_dataReady", pdfData => {
        let zzz =  pdfParser.getRawTextContent();
        console.log(zzz);
        let ceName = getUsefulInfo(zzz, false)
        const newFile = `${outputDir}${ceName}_${name}.pdf`
        fs.rename(originFile, newFile, (err) => {
          if(err){
            console.log(err);
          }else{
            let fie = getAllBillInfo(zzz, false)
            console.log(fie);
            let data = []
            let tmp = ['行号(必输)', '发票种类代码','发票代码','发票号码','开票日期(格式YYYY/MM/DD)',
            '校验码后六位','购方税号（我公司税号）','班组']
            let val = [1,10,fie.codeOfPiao, fie.numberOfPiao,fie.billDate,fie.judgeCode,fie.orgNum,fie.group]
            data.push(tmp)
            data.push(val)
            let buffer = xlsx.build([{name:'ss',data: data}])
            fs.writeFileSync(outputDir+ name+ '.xlsx', buffer, 'binary')
            res.success({url: outputDir+ name+'.xlsx'})
          }
          pdfParser.destroy()
        })
      });
      pdfParser.loadPDF(originFile)
    }
  })

})

router.post('handleZip', (req, res)=>{

})

module.exports = router