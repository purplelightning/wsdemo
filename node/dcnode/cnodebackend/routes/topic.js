let express = require('express');
let router = express.Router();

const url = require('url');

const Topic = require('../models/topic');
const jwt = require('../utils/jwt');
const { formatDate } = require('../utils/date');

router.get('/list', (req, res) => {
  const obj = url.parse(req.url, true).query
  let param = {}
  if(obj.tab !== 'all'){
    param.tab = obj.tab
  }
  Topic.find(param).skip((obj.page-1)*obj.pageSize).limit(parseInt(obj.pageSize) || 10).then(docs => {
    res.success(docs)
  })
})

router.post('/addTopic', jwt.verify(), (req, res) => {
  let tmp = new Topic({
    title: req.body.title,
    content: req.body.content,
    tab: req.body.tab,
    replyLIst:[],
    createTime: formatDate(),
    author: {name: req.body.author, avatarUrl: req.body.avatarImg || ''},
    top: false,
    replyCount: 0,
    visitCount: 0,
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

router.get('/getDetail', (req, res) => {
  Topic.find({id: req.query.id}, (err, docs) => {
    if(err){
      console.log(err);
    }else if(!docs.length){
      res.error('未找到该文章')
    }else{
      res.success(docs[0])
      Topic.findByIdAndUpdate({_id: docs[0]._id}, {visitCount: docs[0].visitCount+1}, (err, doc) => {
        if(err){
          console.log(err);
        }
      })
    }
  })
})

router.post('/updateTopic', jwt.verify(), (req, res) => {
  Topic.findByIdAndUpdate({_id: req.body.id}, req.body, (err, doc) => {
    if(err){
      res.error('文章修改失败')
    }else{
      res.success('文章修改成功')
    }
  })
})


module.exports = router;