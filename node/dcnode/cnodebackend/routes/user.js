let express = require('express');
let router = express.Router();
let crypto = require('crypto');

const User = require('../models/user');

router.get('/test', async(req, res) => {
  res.success('接口测试返回')
})

router.post('/signin', async(req, res) => {
  let md5 = crypto.createHash('md5')
  let pwd = md5.update(req.body.password).digest('base64')
  User.findOne({ name: req.body.username }, (err, docs) =>{
    if(err){
      console.log(err);
      return
    }
    if(!doc){
      res.error('请输入正确的用户名')
    }else if(password !== doc.password){
      res.error('密码错误')
    }else{ // 登录成功保存状态
      res.success('登录成功')
    }
  })
})


// router.post('/signup', async (req, res) => {
//   let md5 = crypto.createHash('md5')
//   let pwd = md5.update(req.body.password).digest('base64')
//   User.find({ name: req.body.username }, (err, docs) =>{
//     if(err){
//       console.log(err);
//       return
//     }
//     if(docs.length){

//     }
//   })
// })


module.exports = router;
