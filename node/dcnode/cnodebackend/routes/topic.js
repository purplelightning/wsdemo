let express = require('express');
let router = express.Router();

const url = require('url');
const uuid = require('node-uuid');

const Topic = require('../models/topic');
const jwt = require('../utils/jwt');

router.get('/list', (req, res) => {
  const obj = url.parse(req.url, true).query
  Topic.find(obj, (err, docs) => {
    if(err){
      console.log(err);
    }else{
      res.success(docs)
    }
  })
})

router.post('/addTopic', jwt.verify(), (req, res) => {
  let tmp = new Topic({
    title: req.body.title,
    content: req.body.content,
    tab: req.body.tab,
    replyLIst:[],
    createTime: new Date().getTime(),
    author: req.body.author,
    id: uuid.v1()
  })
  console.log(tmp);
  tmp.save((err, doc) => {
    if(err){
      console.log(err)
      res.error('添加失败')
    }else{
      res.success('添加文章成功')
    }
  })
})


module.exports = router;