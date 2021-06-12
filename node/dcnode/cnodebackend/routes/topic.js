let express = require('express');
let router = express.Router();

const url = require('url');

const Topic = require('../models/topic');
const Collection = require('../models/collection');
const jwt = require('../utils/jwt');
const jtt = require('jsonwebtoken');
const { formatDate } = require('../utils/date');
const uuid = require('node-uuid');

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
  let userId = ''
  if(req.headers.authorization){
    userId = jtt.decode(req.headers.authorization).id
  }
  let obj = url.parse(req.url, true).query
  Topic.find({_id: obj.id}, (err, docs) => {
    if(err){
      console.log(err);
    }else if(!docs.length){
      res.error('未找到该文章')
    }else{
      let detail = docs[0]
      let newCount= detail.visitCount+1
      detail.visitCount = newCount
      if(!userId){
        res.success(detail)
      }else{//登录后判断是否被收藏
        Collection.findOne({collectUserId: userId, collectTopicId:obj.id}, (err, doc)=>{
          if(err){
            console.log(err);
          }else if(doc){
            detail.isCollected = true
          }else{
            detail.isCollected = false
          }
          res.success(detail)
        })
      }
      Topic.findByIdAndUpdate({_id: detail._id}, {visitCount: newCount}, (err, doc) => {
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

router.post('/deleteTopic', jwt.verify(), (req, res)=>{
  Topic.findByIdAndRemove({_id: req.body.id}, (err, doc) => {
    if(err){
      res.error('删除失败')
    }else{
      res.success('删除成功')
    }
  })
})

router.post('/addReply', jwt.verify(), (req, res) => {
  Topic.findOne({_id: req.body.id}, (err, doc) =>{
    if(err){
      console.log(err);
    }else{
      let replyList = doc.replyList
      let tmp = {
        id: uuid.v1().replace(/-/g, ''),
        content: req.body.content,
        replyId: req.body.replyId || '',
        author: req.body.author,
        createTime: formatDate(),
        ups: 0,
      }
      replyList.push(tmp)
      Topic.findByIdAndUpdate({_id: doc._id}, {replyList: replyList, replyCount: doc.replyCount+1,
      lastReplyAt: formatDate()}, (err, doc)=>{
        if(err){
          console.log(err);
        }else{
          res.success('添加回复成功')
        }
      })
    }
  })
})


module.exports = router;