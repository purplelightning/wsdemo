const express= require('express');
const router = express.Router()
const {CrawModel, CourseModel} = require('../../models/craw');
const { basicHeader } =require('../../utils/common');

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

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

// 代理
const srequest = require('superagent');
require('superagent-proxy')(srequest)
var proxy = 'http://127.0.0.1:1181'
var youtubeHeader= {
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Encoding':'gzip, deflate, sdch, br',
  'Accept-Language':'zh-CN,zh;q=0.8,zh-TW;q=0.6',
  'Cache-Control':'max-age=0',
  'Cookie':'__Secure-3PSID=xAdqSMNkxyIms21MsDm1P0T-XJSVrX-0-42fe2BSNuVv5Gz7rIdIWXZEsp5uUEg3_xKwWw.; __Secure-3PAPISID=bo42P8P0Ios_1VW7/AzJo06sn7Wp-HZwcM; CONSENT=YES+CN.zh-CN+20170326-06-0; __Secure-3PSIDCC=AJi4QfGGSfs9hfa2yglmjA1oTdXA2MOlL70JkKeYwOADkgeHm5i1xGkAdsdAVynl-FqD5I0chw; GPS=1; VISITOR_INFO1_LIVE=N_CGWXLmYoY; YSC=Z4Ww9S66_CE; PREF=tz=Asia.Shanghai',
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
  waitTimeout: 720000,
  show: true,
  executionTimeout: 60000,
})
let wwUrl = ''
function mangaCrawerc(url){
  console.log('开始爬取----------');
  var header ={ 'referer': '' }

  nightmare.goto(wwUrl,header)
  .wait(function(){
    var sElement = document.scrollingElement
    var showBtn = document.querySelector('.show-btn')
    if(showBtn){ // 加载更多
      document.querySelector('.show-btn').click()
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

function handleBase64(base64Str, name){
  let tmp = base64Str.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,'');
  var dataBuffer = new Buffer.from(tmp,'base64')
  fs.writeFileSync(name, dataBuffer)
}

// function mangaCrawer(url, callback){
//   var mangaHeader = {
//     ...basicHeader,
//     'content-type': 'application/json;charset=UTF-8',
//     'cookie':'_ga=GA1.2.1194383735.1609691883; __atssc=google%3B1; __atuvc=9%7C1; dsq__=3iokdv4186k96q; Hm_lvt_5ee99fa43d3e817978c158dfc8eb72ad=1623937995; _gid=GA1.2.1834432239.1623937996; Hm_lvt_07c8e2ff21896b108ed45c014aa2e8b5=1623856650,1623933948,1624022340; Hm_lvt_bfaaeccba983e87596c65c3306010a81=1623856650,1623933949,1624022340; __cf_bm=e4c103d9dc3a8aca866a0f9ae671a126e311485e-1624023832-1800-AVX/lF7vLJxoeGn6PJQ8UAl/8YEID542y31zhc88CziBufy/FRp50HVDNtYgdwppXWtOG5soBWHF5wd3GSjx94B1j2VgIspU48+kMizsHoVqs2yQG4pFlNAEg522rdkRxw==; Hm_lpvt_07c8e2ff21896b108ed45c014aa2e8b5=1624023853; Hm_lpvt_bfaaeccba983e87596c65c3306010a81=1624023853',
//     'referer': '',
//   }
//   srequest.post(sisterUrl)
//   .send(sisterParam)
//   .set('header', mangaHeader)
//   .proxy(proxy)
//   .end((err, res)=> {
//     // res.setEncoding('utf-8');
//     if(err){
//       console.log(err);
//     }
//     else{
//       let $ = cheerio.load(res.text)
//       let chapterList = []
//       $('li').each(function(){
//         let dom = $(this).find('a')
//         let name = dom.text()
//         let url = 'https://v2.mangapark.net' + dom.attr('href')
//         chapterList.push({name,url})
//       })
//       console.log(chapterList);
//     }
//   })
// }


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

function saveToMongo(list){
  console.log('list: '+list.length)
  list.forEach(v=>{
    let tmp = new CrawModel({...v})
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
    let tmp = new CourseModel({...v})
    tmp.save((err,doc)=>{
      if(err){
        console.log(err)
      }else{
        console.log('保存成功')
      }
    })
  })
}

router.get('/crawManga', (req, res) => {
  let {url, type} = req.query
  console.log(req.query);
  mangaCrawerc(url)
})




module.exports = router
