const express = require('express');
const router = express.Router()

const Collection = require('../models/collection');
const Topic = require('../models/topic');
const jwt = require('../utils/jwt');
const jtt = require('jsonwebtoken');


router.get('/list', jwt.verify(), (req, res) => {
  const param = jtt.decode(req.headers.authorization)
  Collection.find({ collectUserId: param.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.success(docs)
    }
  })
})

router.post('/handleFav', jwt.verify(), (req, res) => {
  const param = jtt.decode(req.headers.authorization)

  let obj = {
    collectUserId: param.id,
    collectTopicId: req.body.topicId,
  }
  Collection.findOne(obj, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc) {
      Topic.findOne({_id: req.body.topicId}, (err,doc)=>{
        if(err){
          console.log(err);
        }else{
          let tmp = new Collection({
            ...obj,
            topicTitle: req.body.title,
            addTime: new Date(),
            author: doc.author
          })
          tmp.save((err, doc) => {
            if (err) {
              console.log(err);
              res.error('收藏失败')
            } else {
              res.success('收藏成功')
            }
          })
        }
      })
      
    } else {
      Collection.findOneAndRemove(obj, (err, doc)=>{
        if(err){
          console.log(err);
          res.error('取消收藏失败')
        }else{
          res.success('取消收藏成功')
        }
      })
    }
  })
})

module.exports = router