let express = require('express');
let router = express.Router();

const url = require('url');

const Topic = require('../models/topic');

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

router.post('/addToic', (req, res) => {
  let tmp = ({
    title: req.body.title,
    content: req.body.content,
    replyLIst:[],
    createTime: new Date().getTime(),
    author: '',
    id: ''
  })
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