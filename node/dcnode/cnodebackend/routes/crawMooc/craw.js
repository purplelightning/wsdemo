const express= require('express');
const router = express.Router()
const {MoocVideoModel, MoocCourseModel, MangaModel} = require('../../models/craw');
const { basicHeader } =require('../../utils/common');

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const https = require('https');

router.get('/crawMooc', (req, res) => {
  let courseUrl = req.query.courseUrl
  let type = req.query.type
  if(!type){// 课程视频列表
    videocrawler(courseUrl, (list) => saveToMongo(list))
  }else if(type==='frontend'){ // 课程列表
    courseTypeCrawler(courseUrl, (list) => saveCourseToMongo(list))
  }else{
    imgCrawer(courseUrl, ()=>{})
  }
})

router.get('/crawManga', (req, res) => {
  let {url, type} = req.query
  console.log(req.query);
  // mangaCrawerc(url)
  // mangaCrawerh(url)
  // mangaCrawermChp(url)
  let index= 22
  let gurl = ''
  let mangaPicUrl = gurl + index
  mangaCrawermPic(mangaPicUrl,index)
  index++
  aa=setInterval(()=>{
    mangaPicUrl = gurl +index
    if(index>82){
      clearInterval(aa)
      return
    }
    mangaCrawermPic(mangaPicUrl,index)
    index++
  }, 70000)
})

// 代理
const srequest = require('superagent');
require('superagent-proxy')(srequest)
var proxy = 'http://127.0.0.1:1181'
var youtubeHeader= {
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Encoding':'gzip, deflate, sdch, br',
  'Accept-Language':'zh-CN,zh;q=0.8,zh-TW;q=0.6',
  'Cache-Control':'max-age=0',
  'Cookie':'',
  'Upgrade-insecure-requests':'1',
  'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36',
  'X-Chrome-Uma-Enabled':'1',
  'X-Client-Data':'CJa2yQEIorbJAQjBtskBCKmdygE=',
  'Connection': 'keep-alive'
}

function imgCrawer(url, callback){
  srequest(url)
  .set('header', youtubeHeader)
  .proxy(proxy)
  .end(onresponse)

  function onresponse(err, res){
    res.setEncoding('utf-8'); //防止中文乱码
    if(err){
        console.log(err);
    }else{
      console.log('status:'+res.status);
      console.log(res.text);
      //将res.text写入json文件
      fs.writeFile(__dirname+'/youtube.json',JSON.stringify({
        data: res.text
      }),function(err){
        if(err){
            return console.log(err);
        }
        console.log('完成');
      });

    }
  }
}

const Nightmare = require('nightmare');

const nightmare = Nightmare({
  openDevTools: {
    mode: 'right',       // 开发者工具位置：right, bottom, undocked, detach
  },
  waitTimeout: 720000,
  show: true,
  executionTimeout: 60000,
})
let clUrl = ''
function mangaCrawerc(url){
  console.log('开始爬取----------');
  var header ={ 'referer': '' }

  nightmare.goto(clUrl,header)
  .wait(function(){
    var sElement = document.scrollingElement
    var showBtn = document.querySelector('.show-btn')
    if(showBtn){ // 加载更多
      showBtn.click()
      return false
    }
    var lastBtns = document.querySelectorAll('.hide-btn')
    var lastBtn = lastBtns[lastBtns.length-1]
    var lastChapter = lastBtn.parentElement.previousElementSibling.querySelector('.cartoon-list')
    var imgs = lastChapter.querySelectorAll('img')
    // 滚动处理懒加载，直到最后的图片的src都是真实的地址
    if(imgs[imgs.length-1].getAttribute('data-url').length<100){
      sElement.scrollTop += 800
      return false
    }else{
      return true
    }
  })
  .evaluate(function(){
    var name = document.title.split(/(\【|\】)/)[4]
    var cartoons = document.querySelectorAll('.cartoon-list')
    var imgList = []
    for(let i=0;i<cartoons.length;i++){
      var imgs = cartoons[i].querySelectorAll('img')
      var arr = []
      imgs.forEach(v=>{
        arr.push(v.getAttribute('src'))
      })
      imgList.push(arr)
    }
    return {list: imgList, name: name}
  })
  .end()
  .then(res=>{
    if(!fs.existsSync(`public/download/${res.name}`)){
      fs.mkdirSync(`public/download/${res.name}`)
    }
    let count =0
    let imgList = res.list
    console.log(`章节数:${imgList.length}`);
    for(let i=0;i<imgList.length;i++){
      let chapt = imgList[i]
      let chapterName = `public/download/${res.name}/第${i+1}话`
      if(chapt.length && !fs.existsSync(chapterName)){
        console.log(`下载第${i+1}话`);
        fs.mkdirSync(chapterName)
      }
      for(let j=0;j<chapt.length;j++){
        handleBase64(chapt[j], `${chapterName}/${j+1}.jpg`)
        count++
      }
    }
    console.log('完成');
    console.log(`下载了${count}张图片`);
  })
  .catch(err=>console.log(err))
}

// base64图片写入
function handleBase64(base64Str, name){
  let tmp = base64Str.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,'');
  var dataBuffer = new Buffer.from(tmp,'base64')
  fs.writeFileSync(name, dataBuffer)
}

let hurl = ''
function mangaCrawerh(url){
  let hheader = {
    'referer': '',
    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36'
  }
  nightmare.goto(hurl, hheader)
  .wait(function(){
    let content = document.querySelector('.content')
    if(content == null){
      return false
    }
    let imgs = content.querySelectorAll('img')
    let sElement = document.scrollingElement
    if(imgs[imgs.length-1].getAttribute('src').length<100){
      sElement.scrollTop += 300
      return false
    }
    return true
  })
  .evaluate(function(){
    let content = document.querySelector('.content')
    let imgs = content.querySelectorAll('img')
    let imgList = []
    imgs.forEach(v=>{
      imgList.push(v.getAttribute('src'))
    })
    return imgList
  })
  .end()
  .then(res=>{
    console.log('开始写入图片');
    let count = 0
    let pathIndex=1
    let path = `public/download/CG${pathIndex}`
    while(fs.existsSync(path)){
      pathIndex++
      path = `public/download/CG${pathIndex}`
    }
    fs.mkdirSync(path)
    for(let i=0;i<res.length;i++){
      handleBase64(res[i], `${path}/${i+1}.jpg`)
      count++
    }
    console.log('共下载'+ count + '张图片');
  }).catch(err => console.log(err))
}

const proxyNightmare = Nightmare({
  switches:{
    'proxy-server': proxy
  },
  openDevTools: {
    mode: 'right', 
  },
  waitTimeout: 720000,
  show: false,
  executionTimeout: 60000,
})

//查看章节
function mangaCrawermChp(url, callback){
  var mangaHeader = {
    ...basicHeader,
    'cookie':'',
    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91',
    'sec-ch-ua-mobile': '?0'
    // 'referer': '',
  }

  proxyNightmare.goto(ssUrl, mangaHeader)
  .wait(function(){
    let listdom = document.querySelector('#episodes-lang-en')
    if(!listdom){
      return false
    }
    return true
  })
  .evaluate(function(){
    let title= document.title
    let listdom = document.querySelector('#episodes-lang-en')
    let lists = listdom.querySelectorAll('a')
    let arr = []
    lists.forEach(v=>{
      arr.push({title: title, chapterName: v.innerText, chapterUrl: v.getAttribute('href')})
    })
    return arr
  })
  .end()
  .then(res=>{
    saveToMongo(res, 'manga')
  }).catch(err=>console.log(err))
}

function mangaCrawermPic(url, index){
  var mangaHeader = {
    ...basicHeader,
    'cookie':'',
    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91',
    'sec-ch-ua-mobile': '?0',
    'referer': '',
  }
  console.log(url)
  console.log(`开始爬取第${index}话`);
  Nightmare({
    switches:{
      'proxy-server': proxy
    },
    openDevTools: {
      mode: 'right', 
    },
    waitTimeout: 720000,
    show: false,
    executionTimeout: 60000,
  }).goto(url, mangaHeader)
  .wait(function(){
    let ss = document.querySelector('#select-load')
    if(!ss){
      return false
    }
    return true
  })
  .select('#select-load', 'f')
  .wait(5000)
  .evaluate(function(){
    let title = document.title.split(' - ')[0].trim()
    let ctitle = document.title.split(' - ')[1].trim()
    let viewer = document.querySelector('#viewer')
    let imgs = viewer.querySelectorAll('img')
    let imgList = []
    imgs.forEach(v=>{
      imgList.push(v.getAttribute('src'))
    })
    return {title:title, chapterTitle: ctitle, list:imgList}
  })
  .end()
  .then(res=>{
    console.log(`成功解析${res.chapterTitle}`);
    let dirname = `public/download/MangaPark/${res.title}`
    if(!fs.existsSync(dirname)){
      fs.mkdirSync(dirname)
    }
    let chaName = dirname+`/${res.chapterTitle}`
    if(!fs.existsSync(chaName)){
      fs.mkdirSync(chaName)
    }
    for(let i=0;i<res.list.length;i++){
      handleOriPics(res.list[i], chaName+`/${i+1}.jpg`)
    }

  }).catch(err=>console.log(err))
}

// 图片写入
function handleOriPics(picUrl, name){
  https.get(picUrl, res=>{
    res.setEncoding('binary')
    let str = ''
    res.on('data', chunk=>{
      str+= chunk
    })
    res.on('end', ()=>{
      fs.writeFile(name, str, 'binary',(err,res)=>{
        if(err){
          console.log(`${name}写入失败`);
        }else{
          console.log(`${name}写入成功`);
        }
      })
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
    let courseName = $('.path span').text()
    let coursePrice = $('.ori-price').text().trim().match(/\S+/)
    coursePrice = coursePrice[0]
    let author = $('.medias .name').text()
    $('.title_info').each(function(){
      var titleArr= $(this).parent().parent().parent().find('.name').text().split(/\s+/);
      title = titleArr[0] + ' '+ titleArr[1]
      var text = $(this).text();
      text = text.split('  ');
      var time = ''
      if(text[1]){
        time = text[1].replace(/(\(|\))/g,'')
      }
      var item={
        title: title,
        name : text[0],
        duration : time || '',
        url: 'http://www.imooc.com'+$(this).attr('href'),
        courseName: courseName,
        author: author,
        coursePrice: coursePrice,
        courseUrl: url,
      };
      videoList.push(item);
    });
    callback(videoList);
  });
}

function courseTypeCrawler(url,callback){
  //获取页面
  request(url,function(err,res){
    if(err){
        callback(err);
    }

    var $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析
    var courseList = [];
    $('.course-card').each(function(){
      var name= $(this).find('.title').text();
      var price = $(this).find('.price').text()
      var url = $(this).find('a').attr('href')
      url = 'https://coding.imooc.com/'+ url
      var des = $(this).find('.one').text()
      var type = des.split('·')[0].replace(/(\s+|\n)/g,'')
      var num = des.split('·')[1]
      num = num.match(/\d+/)
      num = num[0]
      var imgUrl = $(this).find('.img').attr('style')
      var reg = /\((.)+\)/
      imgUrl = 'https:' + imgUrl.match(reg)[0].replace(/(\(|\))/g,'')
      var item={
        courseName: name,
        coursePrice: price,
        courseUrl: url,
        imgUrl: imgUrl,
        courseType: type,
        numOfStudents: num
      };
      courseList.push(item);
    });
    fs.writeFileSync('public/files/output/aa.json', JSON.stringify(courseList))
    callback(courseList);
  });
}

function saveToMongo(list,type){
  console.log('保存到数据库，条数为：' + list.length);
  let model
  if(type && type === 'manga'){
    console.log('aaaaa');
    model = MangaModel
  }else{
    console.log('bbbbbbb');
    model = MoocVideoModel
  }
  list.forEach(v=>{
    let tmp = new model({...v})
    tmp.save((err,doc)=>{
      if(err){
        console.log(err)
      }else{
        console.log('保存成功')
      }
    })
  })
}

function saveCourseToMongo(list){
  console.log('list: '+list.length)
  list.forEach(v=>{
    let tmp = new MoocCourseModel({...v})
    tmp.save((err,doc)=>{
      if(err){
        console.log(err)
      }else{
        console.log('保存成功')
      }
    })
  })
}



module.exports = router
