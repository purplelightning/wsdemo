let express = require('express');
let router = express.Router();
let crypto = require('crypto');
const jwt = require('../utils/jwt');
const jtt = require('jsonwebtoken');

const User = require('../models/user');

const multer = require('multer');
const upload = multer({dest: 'public/avatar/'})

router.get('/test', async (req, res) => {
  res.success('接口测试返回')
})

router.post('/signin', (req, res) => {
  let md5 = crypto.createHash('md5')
  let pwd = md5.update(req.body.password).digest('base64')
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
        avatarImg: '/avatar/default.jpg',
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

router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
  let authorization = req.headers.authorization
  const info = jtt.decode(authorization)

  // req.file.path windows路径有\\， ubuntu没有\\
  let reg = /\\/g
  let newLogo = req.file.path
  newLogo = newLogo.replace(reg,'/').replace('public', '')
  User.findByIdAndUpdate({_id: info.id},
    {"$set": {avatarImg: newLogo}},{new: true}, (err, data) => {
      if(err){
        console.log(err)
        res.error('头像修改失败')
      }else{
        res.success(newLogo)
      }
    })
})


module.exports = router;
