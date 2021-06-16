const express= require('express');
const router = express.Router()
const {CrawModel, CourseModel} = require('../../models/craw');

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

router.get('/crawMooc', (req, res) => {
  console.log(req.query);
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
var header= {
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
  console.log(url)
  srequest(url)
  .set('header',header)
  .proxy(proxy)
  .end(onresponse)
}

function onresponse(err, res){
  console.log('-jfjfffff');
  console.log(err);
  console.log(res);
  res.setEncoding('utf-8'); //防止中文乱码
    if(err){
        console.log(err);
    }else{
      console.log('status:'+res.status);
      //console.log(res.headers);
      console.log(res.text);
      //将res.text写入json文件
      fs.writeFile(__dirname+'/home.json',JSON.stringify({
          status: 0,
          data: res.text
      }),function(err){
          if(err){
              return console.log(err);
          }
          console.log('完成');
      });
    }
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

module.exports = router
