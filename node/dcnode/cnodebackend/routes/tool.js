const express = require('express');
const router = express.Router()

const { getUsefulInfo } = require('../utils/common');

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

module.exports = router