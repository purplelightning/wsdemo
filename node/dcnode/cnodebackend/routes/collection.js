const express = require('express');
const router = express.Router()

const Collection = require('../models/collection');
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
  Collection.findOne(req.body, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc) {
      let tmp = new Collection({
        collectUserId: param.id,
        collectTopicId: req.body.topicId,
        topicTitle: req.body.title,
        createTime: new Date()
      })
      tmp.save((err, doc) => {
        if (err) {
          console.log(err);
          res.error('收藏失败')
        } else {
          res.success('收藏成功')
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