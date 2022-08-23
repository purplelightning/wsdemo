import fs from 'fs'

const pdfPoppler = require("pdf-poppler"); // pdf转图片
import { Decoder } from "@nuintun/qrcode"; // 图片二维码解析
const qrcode = new Decoder();

const xlsx = require("node-xlsx");

const AdmZip = require("adm-zip-iconv");
const originAdmZip = require("adm-zip");
// 解决admzip压缩时中文乱码问题
function packer(folder, filepath) {
  var zip = new originAdmZip();
  zip.addLocalFolder(folder);
  // update file headers
  zip.getEntries().forEach((entry) => {
    entry.header.flags |= 0x0800; // Set bit 11 - APP Note 4.4.4 Language encoding flag (EFS)
  });
  // save file (we generate our content again)
  zip.writeZip(filepath);
}


import { getPicOptions, uploadDir, outputDir, tableHeader } from '../utils/config'
import func from '../utils/common'
const { addContent, addCheckContent, getAllBillInfoByQrcode, deleteDirFunc} = func


import store from '@/store'
import { useInfoStore } from '@/store/info';
import { findOneDb, insertDb, insertMultiDb} from '../utils/db';
const infoStore = useInfoStore(store)


// 文件路径，最终文件名，原文件名，类型
export const handleSingle = async (filePath, fileName, originName, type) => {
  const dataBuffer = fs.readFileSync(filePath)
  const uploadPath = uploadDir + fileName
  fs.writeFileSync(uploadPath, dataBuffer)
  console.log(fileName + "写入成功")
  let finalName = fileName.split(".")[0];

  const options = getPicOptions(outputDir, uploadPath)
  const info = await getPdfInfo(uploadPath, options, originName)
  const arr = info.split(',')
  const newFile = `${outputDir}${arr[2]}_${arr[3]}_${finalName}.pdf`;
  if(type === 'pdf'){
    renamePdf(uploadPath, newFile)
    insertDb({
      originName: originName,
      key: `${arr[2]}_${arr[3]}`
    })
  }else if(type === 'excel'){
    let fie = getAllBillInfoByQrcode(arr)
    genExcel(uploadPath, newFile, fie, finalName);
    // 记录使用
    insertDb({
      originName: originName,
      key: `${arr[2]}_${arr[3]}`
    })
  }else if(type === 'pdfCheck'){
    const res = await findOneDb({
      key: `${arr[2]}_${arr[3]}`
    })
    if(!res){
      addCheckContent(`发票 ${originName} 未发现使用记录`)
    }else{
      addCheckContent(`发票 ${originName} 已于${res.updateTime.split('|').join(' ')}使用过`, true)
    }
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
let totalCount  = 0

const updateIndex = (index) => {
  // 可以使用pinia设置全局变量，也可以直接操作dom
  zipDis.innerText = `正在处理第${index}/${totalCount}张`
  // infoStore.changeIndex(index)
  // infoStore.changeTotalCount(totalCount)
  let per = Math.floor(index*100 / totalCount)
  // progress.style.background = `linear-gradient(90deg, #0f0, #0ff ${per}%, transparent 0)`
  // circle.innerText = `${index}/${totalCount}`
  circle.style.background = `conic-gradient(
    #11f5e2fd 0,
    #11f5e2fd ${per}%,
    #b3b2ff ${per}%,
    #b3b2ff
  )`
}

export const handleMultiple = async(filePath, fileName, originName, type) => {
  const dataBuffer = fs.readFileSync(filePath)
  const uploadPath = uploadDir + fileName
  fs.writeFileSync(uploadPath, dataBuffer)
  console.log(fileName + "写入成功")
  let name = fileName.split(".")[0];

  const zip = new AdmZip(uploadPath, "GBK");
  let resDir = outputDir + `${name}/`;
  const containerDir = resDir; // 用于最后生成文件删除
  zip.extractAllTo(resDir, true);
  let flag = fs.existsSync(resDir + name);
  if (flag) {
    // 判断解压后文件夹是否包含目录
    resDir = resDir + name + "/";
  }
  const files = fs.readdirSync(resDir);
  
  //校验逻辑 
  if(type && type === 'zipCheck'){
    let keyArr = await checkZipFinal(files, resDir)
    keyArr.forEach(async v => {
      const res = await findOneDb({
        key: v.key
      })
      if(!res){
        addCheckContent(`发票 ${v.name} 未发现使用记录`)
      }else{
        addCheckContent(`发票 ${v.name} 已于${res.updateTime.split('|').join(' ')}使用过`, true)
      }
      infoStore.closeLoading()
    })
    return
  }
  if (!fs.existsSync(outputDir + name + "发票/")) {
    fs.mkdirSync(outputDir + name + "发票/");
  }
  const { ouDir, index, dataArr } = await getZipFinal(
    files,
    resDir,
    outputDir + name + "发票/",
    name,
    containerDir,
  );
  let url = ouDir.replace('/', '')
  // infoStore.setPath(url)
  zipDis.innerText = `共处理${index}/${totalCount}张发票，输出目录：${url}`
  insertMultiDb(dataArr)
}

// pdf文件数组，pdf原始文件夹， 输出目录，原zip文件名
const getZipFinal = async (fileArr, oriDir, ouDir, userName, containerDir) => {
  return new Promise((resolve, reject) => {
    const excelData = [], dataArr = []
    excelData.push(tableHeader);
    let index = 0, len = fileArr.length;
    totalCount = len;
    fileArr.forEach(async (v) => {
      let originPdf = oriDir + v;
      const options = getPicOptions(outputDir, originPdf)
      let tmp = await getPdfInfo(originPdf, options, originPdf)
      const arr = tmp.split(',')
      index++;
      const newFile = `${ouDir}${arr[2]}_${arr[3]}_${userName}${index}.pdf`;
      dataArr.push({
        originName: v,
        key: `${arr[2]}_${arr[3]}`
      })
      let info = getAllBillInfoByQrcode(arr)

      genZip(newFile, originPdf, index, info, ouDir, containerDir);
      function genZip(newFile, originPdf, index, info, ouDir, deleteDir) {
        fs.renameSync(originPdf, newFile);
        const val = [
          userName, index, info.billType, info.codeOfPiao, info.numberOfPiao,
          info.billDate, info.judgeCode, info.orgNum, info.group,
        ];
        excelData.push(val);
        updateIndex(index);
        // 生成excel,打包
        if (index >= len) {
          let buffer = xlsx.build([{ name: "ss", data: excelData }]);
          fs.writeFileSync(ouDir + userName + ".xlsx", buffer, "binary");
          packer(ouDir, `${ouDir}/${userName}.zip`);
          deleteDirFunc(deleteDir);
          resolve({ ouDir, index, dataArr });
        }
      }
    });
  });
};

const checkZipFinal = async (fileArr, oriDir) => {
  let res = [], index = 0, total = fileArr.length
  return new Promise((resolve, reject) => {
    fileArr.forEach(async v => {
      let originPdf = oriDir + v
      const options = getPicOptions(outputDir, originPdf)
      let tmp = await getPdfInfo(originPdf, options, originPdf)
      const arr = tmp.split(',')
      res.push({
        name: v,
        key: `${arr[2]}_${arr[3]}`
      })
      index++
      if(index === total){
        resolve(res)
      }
    })
  })
}