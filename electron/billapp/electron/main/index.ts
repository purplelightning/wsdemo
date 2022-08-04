import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'os'
import { join } from 'path'

import fs from 'fs'
import path from 'path'

import config from '../../src/utils/config'
const { uploadDir, outputDir, tableHeader } = config
import func from "../../src/utils/funcs.js";
const { getAllBillInfoByQrcode, deleteDirFunc } = func

const pdfPoppler = require("pdf-poppler"); // pdf转图片
import { Decoder } from "@nuintun/qrcode"; // 图片二维码解析
const qrcode = new Decoder();

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,

      webSecurity: false
    },
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})
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
ipcMain.on('delete-output', event => {
  deleteDirFunc(outputDir)
  fs.mkdirSync(outputDir)
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

  let pic = await getPdfInfo(uploadPath, opts, originName)
  event.sender.send('readQrcode', pic)
  return

  let info:any = await getPdfInfo(uploadPath, opts, originName)
  console.log(info)
  const arr = info.split(',')
  const newFile = `${outputDir}${arr[2]}_${arr[3]}_${finalName}.pdf`;
  fs.rename(uploadPath, newFile, (err) => {
    if (err) {
      console.log(err)
    } else {
      event.sender.send('addDom', `输出文件：${newFile}`)
    }
  });
})


function getPdfInfo(uploadPath:string, opts: any, originalName: string){
  return new Promise((resolve,reject) => {
    const pic = opts.out_dir + "\\" + opts.out_prefix + "-1.jpg";
    // 有同名的图片，先删除，防止无法解析
    if(fs.existsSync(pic)){
      fs.unlinkSync(pic)
    }
    // 生成图片
    pdfPoppler.convert(uploadPath, opts)
    .then((res:any) => {
      console.log("Successfully converted： ");
      resolve(pic)
      // resolve(pic)
      // 解析二维码
      // qrcode.scan(path.join(__dirname, './aaa-1.jpg'))
      //   .then((result:any) => {
      //     fs.unlinkSync(pic)
      //     resolve(result.data)
      //   }).catch((error:any) => {
      //     console.log('pic failed  '+ pic)
      //     console.log(error)
      //     // addContent(`图片 ${originalName} 解析失败`)
      //   });
    })
    .catch((error: any) => {
      reject(error);
    });
  })
}
