import fs from 'fs'

const pdfPoppler = require("pdf-poppler"); // pdf转图片
import { Decoder } from "@nuintun/qrcode"; // 图片二维码解析
const qrcode = new Decoder();

const xlsx = require("node-xlsx");

import { getPicOptions, uploadDir, outputDir, tableHeader } from '../utils/config'
import func from '../utils/common'
const { addContent, getAllBillInfoByQrcode} = func

// 文件路径，最终文件名，原文件名，类型
export const handleSingle = async (filePath, fileName, originName, type) => {
  const dataBuffer = fs.readFileSync(filePath)
  const uploadPath = uploadDir + fileName
  fs.writeFileSync(uploadPath, dataBuffer)
  console.log(fileName + "写入成功")
  let finalName = fileName.split(".")[0];

  const options = getPicOptions(outputDir, uploadPath)
  const info = await getPdfInfo(uploadPath, options, originName)
  console.log(info);
  const arr = info.split(',')
  const newFile = `${outputDir}${arr[2]}_${arr[3]}_${finalName}.pdf`;
  if(type === 'pdf'){
    renamePdf(uploadPath, newFile)
  }else if(type === 'excel'){
    let fie = getAllBillInfoByQrcode(arr)
    genExcel(uploadPath, newFile, fie, finalName);
  }
}

const renamePdf = (uploadPath, newFile) => {
  fs.rename(uploadPath, newFile, (err) => {
    if (err) {
      console.log(err)
    } else {
      addContent(`输出文件：${newFile}`)
    }
  });
}

function genExcel(filePath, newFile, fie, finalName) {
  fs.renameSync(filePath, newFile)
  let data = [];
  let val = [
    finalName, 1, fie.billType, fie.codeOfPiao, fie.numberOfPiao,
    fie.billDate, fie.judgeCode, fie.orgNum, fie.group,
  ];
  data.push(tableHeader);
  data.push(val);
  let buffer = xlsx.build([{ name: "ss", data: data }]);
  fs.writeFileSync(outputDir + finalName + ".xlsx", buffer, "binary");
  addContent(`输出文件：`)
  addContent(`${newFile}`)
  addContent(`${outputDir + finalName}.xlsx`)
}


// pdf转图片，从图片解析二维码信息
function getPdfInfo(uploadPath, opts, originalName) {
  return new Promise((resolve, reject) => {
    const pic = opts.out_dir + "\\" + opts.out_prefix + "-1.jpg";
    // 有同名的图片，先删除，防止无法解析
    if (fs.existsSync(pic)) {
      fs.unlinkSync(pic)
    }
    // 生成图片
    pdfPoppler.convert(uploadPath, opts)
      .then((res) => {
        console.log("Successfully converted： ");
        // 解析二维码
        qrcode.scan(pic)
          .then((result) => {
            fs.unlinkSync(pic)
            resolve(result.data)
          }).catch((error) => {
            console.log('pic decode failed')
            addContent(`图片 ${originalName} 解析失败`)
          });
      })
      .catch((error) => {
        reject(error);
      });
  })
}