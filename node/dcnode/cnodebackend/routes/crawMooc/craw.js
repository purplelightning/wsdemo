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
  }else{ // 课程列表
    courseTypeCrawler(courseUrl, (list) => saveCourseToMongo(list))
  }
})

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
