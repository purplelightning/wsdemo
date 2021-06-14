const express = require('express');
const router = express.Router()

const https = require('https');
const fs = require('fs');

const cheerio = require('cheerio');

let url1= 'https://movie.douban.com/top250'

router.get('/handleSpider', (req, exRes) => {
  https.get(url1, res => {
    let html = ''
    res.on('data', chunk => {
      html += chunk
    })
    res.on('end', () => {
      console.log(html);
      const $ = cheerio.load(html)
      exRes.success(html)
      let allFilms = []
      $('li .item').each(function () {
        const title = $('.title', this).text().split('/')[0]
        const star = $('.rating_num', this).text()
        const pic = $('.pic img', this).attr('src')
        allFilms.push({ title, star, pic })
      })
      downloadImgs(allFilms, 'public/download/')
    })
  })
})

router.get('/pushReq', (req, res) => {
  
})

const downloadImgs = (films, outputDir) => {
  if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir)
  }
  films.forEach((v,i) => {
    let name = v.title, picUrl = v.pic
    https.get(picUrl, res=>{
      res.setEncoding('binary')
      let str = ''
      res.on('data', chunk=>{
        str+= chunk
      })
      res.on('end', ()=>{
        fs.writeFile(outputDir + `${name}.png`, str, 'binary', err=>{
          if(!err){
            console.log(`第${i}张图片下载成功`);
          }
        })
      })
    })
  });
}

module.exports = router