let express = require('express');
let router = express.Router();
let crypto = require('crypto');
const jwt = require('../utils/jwt');
const jtt = require('jsonwebtoken');
const {formatDate1} = require('../utils/common');

const User = require('../models/user');

const multer = require('multer');

//1.进行Multer的自定义配置  上传设置
const storage = multer.diskStorage({
  //设置文件上传的位置，cb(callback简写)
  destination: 'public/avatar/',
     //设置上传文件名称的操作
  filename: function (req, file, cb) {
    //对于文件名进行相关的操作
    //获取原始文件的扩展名
    var extension = file.originalname.toLowerCase();
    //生成新的文件名 文件名不能用分号
    var de= formatDate1()
    var filename = de + '.' + extension;
    cb(null, filename);
  }
});
const upload = multer({storage: storage})

/**
 * @api {get} /book/bookCategory/cateList 书籍分类列表查找   规定请求类型 接口地址 api标题 接口地址想显示全的话，后续说到配置文件 apidoc.json 中 url 统一在前面添加
 * @apiName 书籍分类列表查找    api标题 跟上面保持一致
 * @apiGroup Book   分组 比如书籍好几个接口，我就用Book作为分组的栏目
 *
 * @apiParam {String} parentId 父级分类id，默认0（顶级分类）   传递的参数 类型 和 说明
 * 
 * @apiSampleRequest /book/bookCategory/cateList    模拟请求
 * 
 * @apiSuccess {Number} status 状态码.   请求成功后返回的字段 类型
 * @apiSuccess {String} title 标题.
 * @apiSuccess {String} description 描述.
 */

/**
 * @api {get} /user/test 
 * @apiName 测试
 * @apiGroup user
 *
 * 
 * @apiSampleRequest /user/test
 * 
 * @apiSuccess {Number} status 1
 * @apiSuccess {Number} Code 200
 * @apiSuccess {String} data 接口测试返回
 */
router.get('/test', async (req, res) => {
  res.success('接口测试返回')
})

/**
  * @api {post} /api/v1/tasks Create a task
  * @apiVersion 1.0.0
  * @apiName Create
  * @apiGroup Task
  * @apiPermission authenticated user
  *
  * @apiParam (Request body) {String} name The task name
  *
  * @apiSuccess (Success 201) {String} message Task saved successfully!
  * @apiSuccess (Success 201) {String} id The campaign id
  *
  * @apiSuccessExample {json} Success response:
  *     HTTPS 201 OK
  *     {
  *      "message": "Task saved successfully!",
  *      "id": "57e903941ca43a5f0805ba5a"
  *    }
  *
  */

/**
 * @api {post} /user/signin 登录
 * @apiGroup user
 *
 * @apiParam (Request body) {String} username 用户名
 * @apiParam (Request body) {String} password 密码
 * 
 * @apiSampleRequest /user/signin
 * 
 * @apiSuccess {Object} code 200
 * @apiSuccess {Number} status 1
 * @apiSuccess {Object} data
 * @apiSuccess {String} msg 登录成功
 */

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

/**
 * @api {post} /user/signup 注册
 * @apiGroup user
 *
 * @apiParam (Request body) {String} username 用户名
 * @apiParam (Request body) {String} password 密码
 * 
 * @apiSampleRequest /user/signup
 * 
 * @apiSuccess {Object} code 200
 * @apiSuccess {Number} status 1
 * @apiSuccess {Object} data
 * @apiSuccess {String} msg 用户XXX注册成功
 */

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
