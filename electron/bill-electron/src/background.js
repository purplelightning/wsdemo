import { app, protocol, BrowserWindow, ipcMain, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path');
const fs = require('fs');
import config from './utils/config'
require('child_process');

const pdfPoppler = require("pdf-poppler"); // pdf转图片

const { uploadDir, outputDir, tableHeader } = config

const isDevelopment = process.env.NODE_ENV !== 'production'
 
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
 
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "./preload.js"),
    }
  })
 
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}
 
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
 
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})
 
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}





// 业务逻辑-----------------------------------------------------

if(!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir)
}
if(!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir)
}

ipcMain.on('open-output', (event) => {
  shell.openPath(outputDir)
})

ipcMain.on("convert-pdf",async (event, filePath, fileName, originName )=>{
  const dataBuffer = fs.readFileSync(filePath)
  const uploadPath = uploadDir + fileName
  fs.writeFileSync(uploadPath, dataBuffer)
  console.log(fileName + "写入成功")

  let finalName = fileName.split(".")[0];
  const opts = {
    format: "jpeg",
    scale: 2048,
    out_dir: outputDir,
    out_prefix: path.basename(uploadPath, path.extname(uploadPath)),
    page: null,
  };

  console.log(uploadPath)
  console.log(opts)
  console.log(originName)

  getPdfInfo(uploadPath, opts, originName)
  // let info = await getPdfInfo(uploadPath, opts, originName)
  // console.log(info)
  // const arr = info.split(',')
  // const newFile = `${outputDir}${arr[2]}_${arr[3]}_${finalName}.pdf`;
  // fs.rename(uploadPath, newFile, (err) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     addContent(`输出文件：${newFile}`)
  //   }
  // });
})


function getPdfInfo(uploadPath, opts, originalName){
  const pic = opts.out_dir + "\\" + opts.out_prefix + "-1.jpg";
    console.log('-----------')
    console.log(pic)
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

  // return new Promise((resolve,reject) => {
  //   const pic = opts.out_dir + "\\" + opts.out_prefix + "-1.jpg";
  //   console.log('-----------')
  //   console.log(pic)
  //   // 有同名的图片，先删除，防止无法解析
  //   if(fs.existsSync(pic)){
  //     fs.unlinkSync(pic)
  //   }
  //   // 生成图片
  //   pdfPoppler.convert(uploadPath, opts)
  //   .then((res) => {
  //     console.log("Successfully converted： ");
  //     // 解析二维码
  //     qrcode.scan(pic)
  //       .then((result) => {
  //         fs.unlinkSync(pic)
  //         resolve(result.data)
  //       }).catch((error) => {
  //         console.log('失败的图片：'+ pic)
  //         addContent(`图片 ${originalName} 解析失败`)
  //       });
  //   })
  //   .catch((error) => {
  //     console.log('bbbbbbbbb')
  //     console.log('zzzzzzzzzzz')
  //     reject(error);
  //   });
  // })
}