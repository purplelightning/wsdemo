let express = require('express');
let router = express.Router();

const url = require('url');
const uuid = require('node-uuid');

const Topic = require('../models/topic');
const jwt = require('../utils/jwt');
const { formatDate } = require('../utils/date');

router.get('/list', (req, res) => {
  console.log(req);
  const obj = url.parse(req.url, true).query
  Topic.find({tab: obj.tab}).skip((obj.page-1)*obj.pageSize).limit().then(docs => {
    console.log(docs);
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
    id: uuid.v1(),
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


module.exports = router;