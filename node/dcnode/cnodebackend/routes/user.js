let express = require('express');
let router = express.Router();
let crypto = require('crypto');
const jwt = require('../utils/jwt');

const User = require('../models/user');

router.get('/test', async (req, res) => {
  res.success('接口测试返回')
})

router.post('/signin', (req, res) => {
  let md5 = crypto.createHash('md5')
  let pwd = md5.update(req.body.password).digest('base64')
  console.log(req.body);
  User.findOne({ name: req.body.username }, (err, doc) => {
    if (err) {
      console.log(err);
      return
    }
    if (!doc) {
      res.error('请输入正确的用户名')
    } else if (pwd !== doc.password) {
      res.error('密码错误')
    } else { // 登录成功保存状态 jwt或session
      let jwtToken = jwt.sign({id: doc._id, username: doc.username, userType: doc.userType})
      let obj = {
        token: jwtToken,
        username: req.body.username,
        avatarImg: doc.avatarImg,
        phone: doc.phone,
        id: doc._id
      }
      
      res.success(obj, '登录成功')
    }
  })
})


router.post('/signup', async (req, res) => {
  let md5 = crypto.createHash('md5')
  let pwd = md5.update(req.body.password).digest('base64')
  User.find({ name: req.body.username }, (err, docs) => {
    if (err) {
      console.log(err);
      return
    }
    if (docs.length) {
      res.error('用户名已注册')
    } else {
      let tmp = new User({
        name: req.body.username,
        password: pwd,
        userType: req.body.userType ? req.body.userType : 'primaryUser',
        phone: '',
        avatarImg: '/static/avatar/default.jpg',
        topList: [],
        favTopicList: [],
      })
      tmp.save((err, doc) => {
        if(err){
          console.log(err);
        }
        res.success(`用户${req.body.username}注册成功`)
      })
    }
  })
})


module.exports = router;
