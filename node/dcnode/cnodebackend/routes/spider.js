const express = require('express');
const router = express.Router()
const Video = require('../models/video');

const https = require('https');
const fs = require('fs');

const request = require('request');
const cheerio = require('cheerio');
const outputDir = 'public/files/output/'

let doubnUrl= 'https://movie.douban.com/top250'
let moocUrl = 'https://www.imooc.com/learn/1264'
let lagouUrl = 'https://kaiwu.lagou.com/'

// https请求
router.get('/handleSpider', (req, exRes) => {
  https.get(doubnUrl, res => {
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

// request请求 拉钩教育
router.get('/pushReq', (req, res) => {
  videocrawler(moocUrl, (list)=> saveToMongo(list))
})

function saveToMongo(list){
  console.log('list: '+list.length)
  list.forEach(v=>{
    let tmp = new Video({...v})
    tmp.save((err,doc)=>{
      if(err){
        console.log(err)
      }else{
        console.log('保存成功')
      }
    })
  })
}

function videocrawler(url,callback){
  //获取页面
  request(url,function(err,res){
    if(err){
        callback(err);
    }
    var $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析
    var videoList = [];
    $('.video li a').each(function(){
      var $title = $(this).parent().parent().parent().text().trim();
      var title = $title.split('\n');
      var text = $(this).text().trim();
      text = text.split('\n');
      var time = text[2].match(/\((\d+\:\d+)\)/);
      var item={
        title : title[0],
        url: 'http://www.imooc.com'+$(this).attr('href'),
        name : text[0]+ text[1].trim(),
        duration : (time && time[1]) || ''
      };
      var s = item.url.match(/(video|code)\/(\d+)/);
      if(Array.isArray(s)){
        item.id = s[1];
        videoList.push(item);
      }
    });
    callback(videoList);
  });
}

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