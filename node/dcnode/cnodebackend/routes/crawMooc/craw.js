const express= require('express');
const router = express.Router()
const crawModel = require('../../models/craw');

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

router.get('/crawMooc', (req, res) => {
  console.log(req.query);
  let courseUrl = req.query.courseUrl
  videocrawler(courseUrl, (list) => saveToMongo(list))
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

function saveToMongo(list){
  console.log('list: '+list.length)
  list.forEach(v=>{
    let tmp = new crawModel({...v})
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
