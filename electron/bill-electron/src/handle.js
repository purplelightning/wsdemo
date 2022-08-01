const fs = require("fs");
const path = require("path");
const { uploadDir, outputDir, tableHeader } = require("./config.js");
const { getAllBillInfoByQrcode, deleteDirFunc, addContent } = require("./utils.js");

const pdfPoppler = require("pdf-poppler"); // pdf转图片
const { Decoder } = require("@nuintun/qrcode"); // 图片二维码解析
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


if(!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir)
}
if(!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir)
}
let totalCount = 0

const outBtn = document.querySelector('#open-out')
outBtn.addEventListener('click', function(){
  ipcRenderer.send("open-output");
})
const deleteBtn = document.querySelector('#delete-out')
deleteBtn.addEventListener('click', function(){
  deleteDirFunc(outputDir)
  fs.mkdirSync(outputDir)
})

const zipDis = document.querySelector('#zip-display')
// const progress = document.querySelector('.g-progress')
const circle = document.querySelector('.c-progress')

function getPdfInfo(uploadPath, opts, originalName){
  return new Promise((resolve,reject) => {
    const pic = opts.out_dir + "\\" + opts.out_prefix + "-1.jpg";
    // 有同名的图片，先删除，防止无法解析
    if(fs.existsSync(pic)){
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
        console.log('失败的图片：'+ pic)
        addContent(`图片 ${originalName} 解析失败`)
      });
  })
  .catch((error) => {
    reject(error);
  });
  })
}

async function handlePdf(type) {
  let dom = null
  if(type === 'pdf'){
    dom = document.querySelector("#hd");
  }else if(type === 'excel'){
    dom = document.querySelector("#ed");
  }
  const nameDom = document.querySelector('#name')
  let tmp = dom.files[0];
  let filePath = tmp.path, fileName = nameDom.value || tmp.name;
  let dataBuffer = fs.readFileSync(filePath);
  const uploadPath = uploadDir + fileName
  fs.writeFileSync(uploadPath, dataBuffer);
  console.log(fileName + "写入成功");

  let name = fileName.split(".")[0];
  const opts = {
    format: "jpeg",
    scale: 2048,
    out_dir: outputDir,
    out_prefix: path.basename(uploadPath, path.extname(uploadPath)),
    page: null,
  };

  let info = await getPdfInfo(uploadPath, opts, tmp.name)
  const arr = info.split(',')
  const newFile = `${outputDir}${arr[2]}_${arr[3]}_${name}.pdf`;
  if(type === 'pdf'){
    fs.rename(uploadPath, newFile, (err) => {
      if (err) {
        console.log(err)
      } else {
        addContent(`输出文件：${newFile}`)
      }
    });
  }else{
    handleExcel(name, uploadPath, newFile, arr)
  }
}

function handleExcel(name, filePath, newFile, arr) {
  let fie = getAllBillInfoByQrcode(arr)
  genExcel(filePath, newFile, fie, name);
}
function genExcel(filePath, newFile, fie, name) {
  fs.renameSync(filePath, newFile);
  let data = [];
  let val = [
    name, 1, billType, fie.codeOfPiao, fie.numberOfPiao,
    fie.billDate, fie.judgeCode, fie.orgNum, fie.group,
  ];
  data.push(tableHeader);
  data.push(val);
  let buffer = xlsx.build([{ name: "ss", data: data }]);
  fs.writeFileSync(outputDir + name + ".xlsx", buffer, "binary");
  addContent(`输出文件：`)
  addContent(`${newFile}`)
  addContent(`${outputDir + name}.xlsx`)
}

const updateIndex = (index) => {
  zipDis.innerText = `正在处理第${index}/${totalCount}张`
  let per = Math.floor(index*100 / totalCount)
  // progress.style.background = `linear-gradient(90deg, #0f0, #0ff ${per}%, transparent 0)`
  circle.style.background = `conic-gradient(
    #11f5e2fd 0,
    #11f5e2fd ${per}%,
    #b3b2ff ${per}%,
    #b3b2ff
  )`
}

async function handleZip() {
  const dom = document.querySelector("#zd");
  let tmp = dom.files[0];
  const nameDom = document.querySelector('#name')
  const finalName =(nameDom.value || tmp.name).split('.')[0]
  let filePath = tmp.path, fileName = tmp.name;
  
  let dataBuffer = fs.readFileSync(filePath);
  const uploadPath = uploadDir + fileName
  fs.writeFileSync(uploadPath, dataBuffer);
  let name = fileName.split(".")[0];
  const zip = new AdmZip(uploadPath, "GBK");
  let resDir = outputDir + `${name}/`;
  const containerDir = resDir; // 用于最后生成文件删除
  zip.extractAllTo(resDir, true);
  let flag = fs.existsSync(resDir + name);
  console.log(flag);
  if (flag) {
    // 判断解压后文件夹是否包含目录
    resDir = resDir + name + "/";
  }
  const files = fs.readdirSync(resDir);
  if (!fs.existsSync(outputDir + finalName + "发票/")) {
    fs.mkdirSync(outputDir + finalName + "发票/");
  }
  const { ouDir, index } = await getZipFinal(
    files,
    resDir,
    outputDir + finalName + "发票/",
    finalName,
    containerDir,
  );
  let url = ouDir.replace('/', '')
  zipDis.innerText = `共处理${index}/${totalCount}张发票，输出目录：${url}`
}

// pdf文件数组，pdf原始文件夹， 输出目录，原zip文件名
const getZipFinal = async (fileArr, oriDir, ouDir, userName, containerDir) => {
  return new Promise((resolve, reject) => {
    const excelData = [];
    excelData.push(tableHeader);
    let index = 0, len = fileArr.length;
    totalCount = len;
    fileArr.forEach(async (v) => {
      let originPdf = oriDir + v;
      const opts = {
        format: "jpeg",
        scale: 2048,
        out_dir: outputDir,
        out_prefix: path.basename(originPdf, path.extname(originPdf)),
        page: null,
      };
      let tmp = await getPdfInfo(originPdf, opts, originPdf)
      const arr = tmp.split(',')
      index++;
      const newFile = `${ouDir}${arr[2]}_${arr[3]}_${userName}${index}.pdf`;
      let info = getAllBillInfoByQrcode(arr)

      genZip(newFile, originPdf, index, info, ouDir, containerDir);
      function genZip(newFile, originPdf, index, info, ouDir, deleteDir) {
        fs.renameSync(originPdf, newFile);
        const val = [
          userName, index, billType, info.codeOfPiao, info.numberOfPiao,
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
          resolve({ ouDir, index });
        }
      }
    });
  });
};

// ipcRenderer
//   .on('zip-converted', (event, obj) => {
//     console.log(obj.url)
//     let url = obj.url.replace('/', '')
//     zipDis.innerText = `共处理${obj.num}张发票，输出目录：${url}`
//   })
//   .on('zip-total', (event, total) => {
//     console.log(progress)
//     totalCount = total
//   })

