import { lstat } from 'fs/promises'
import { cwd } from 'process'
import { ipcRenderer } from 'electron'

import { Decoder } from "@nuintun/qrcode"; // 图片二维码解析
const qrcode = new Decoder();
import fs from 'fs'


// ipcRenderer.on('main-process-message', (_event, ...args) => {
//   console.log('[Receive Main-process message]:', ...args)
// })

// lstat(cwd()).then(stats => {
//   console.log('[fs.lstat]', stats)
// }).catch(err => {
//   console.error(err)
// })

ipcRenderer.on('addDom', (event, content) => {
  const container = document.querySelector('#container') as HTMLElement
  const ele = document.createElement('div')
  ele.innerText = content
  container.appendChild(ele)
})

ipcRenderer.on('readQrcode', (event, pic) => {
  console.log(pic)
  let t:string =pic.replace('\\\\', '\\')
  // 解析二维码
      qrcode.scan(t)
        .then((result:any) => {
          console.log(result.data)
        }).catch((error:any) => {
          console.log('pic failed  '+ pic)
          console.log(error)
          // addContent(`图片 ${originalName} 解析失败`)
        });
})