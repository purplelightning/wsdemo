## Express搭建网站简介

### 背景
现在的前端，仅了解前端方面的内容并不够，需要对后端的内容有一定了解，而Node作为运行在服务端的JavaScript，是前端人员学习后端最容易上手的语言。Express作为一个老牌Node框架，在今天依然有很高的流行度，值得学习；Mongodb是非关系型数据库，通过使用mongoose可以进行快速的开发，适合前端人员的学习。本文介绍了实现一个类似CNODE中文社区的网站所需要的知识，技术栈采用了Node+Express+MongoDB+Vue。

### 环境准备
后端：Node.js 14.0.0，express 4.16.1，MongoDB3.4.4，用到的库：mongoose(操作mongodb)，cors（跨域），jsonwebtoken(jwt中间件)，multer(文件上传)，morgan(日志记录)。
前端：Vue2.6.11，axios:0.21.1，element-ui：2.15.2，vue-router 3.2.0，vuex3.4.0，less3.0.4。

#### 1.创建项目

全局安装Node，express，express-generator，创建express项目：

```
express server
cd server
npm install
npm start
```
浏览器输入http://localhost:3000/来查看页面
![image](C:\Users\songda\Pictures\express.png)

express创建的项目目录说明app.js：启动文件，或者说入口文件，package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块，node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下，public：存放 image、css、js 等文件，routes：存放路由文件，views：存放视图文件或者说模版文件，bin：存放可执行文件。其中views下的模板通过ejs方式进行渲染，如果是前后端分离的模式，可以删掉。

#### 2.数据库

在MongoDB官网上下载数据库，安装好后可以安装MongoDB的可视化工具Robo 3T，方便在开发时进行增删改查，当然也可以通过数据库命令修改数据。
使用MongoDB可以进行快速的项目搭建，MongoDB的常用语法有：
```
mongo
show dbs
use cnode
show tables
db.createCollection("t1") 
db.t1.find({key: value})
db.t1.insert({key1: value1, key2: value2})
db.t1.update({name:'ss'},{$set:{key:value}})
db.t1.remove({key: value})
...
```

### 开发

#### 1.需求分析

项目主要实现一个类似CNODE的社区，用户可以发表/编辑话题，评论，收藏。因此需要实现的功能有用户的注册登录，游客访问，上传/修改头像，话题的增删改查，收藏以及取消收藏功能。

#### 2.数据库结构
MongoDB中用集合和文档来描述数据库，集合相当于关系数据库中的表，文档相当于关系数据库中的行。
项目建立的集合为：
users：用户信息，包括_id，name, password, phone, avatarImg, topicList
topics: 话题信息，包括_id，title, content, tab, author, replyList, createTime, top, replyCount, visitCount, isCollected, lastReplyAt
collections：收藏的话题，单独建立收藏表可以减少查询时的时间复杂度，包括_id，collectUserId, collectTopicId, topicTitle, author, addTime

#### 3.路由
在routes目录下新建users.js, topics.js, collections.js。需要实现的接口请求主要包括用户，话题和收藏，通过建立这3个文件，将接口分为3类，在后端主文件app.js中对请求进行拦截，匹配到对应的文件进行处理。

#### 4.权限控制
目前Web中对鉴权方式目前主要是使用jwt。通过 npm install jsonwebtoken安装好jwt后，设置jwt的过期时间，密钥，当用户请求的接口中需要判断权限时，根据用户传递的header判断用户是否登录，token是否过期，如果不能满足情况，则返回4xx响应，前端根据响应清除登陆状态，跳转到登陆页面。
主要代码如下：
```
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const sign = (payload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: 600 //单位秒
  })
}

const verify = () => (req, res, next) => {
  let token = req.headers.authorization
  if(token){
    jwt.verify(token, SECRET, (err, payload) => {
      if(err){
        res.status(403).error('token过期或无效')
      }else{
        next()
      }
    })
  }else{
    res.status(401).error('请提供jwtToken')
  }
}
```


#### 5.接口开发
项目用到的接口主要有：
用户：登录、注册、上传修改头像
话题：添加，删除，编辑，评论（添加，删除），收藏，筛选，翻页
通过Mongoose可以简化对数据库的操作，在接口开发时先要封装一个model，定义好接口类型，然后通过express的router对匹配到的请求进行处理，实现增删改查。其中一些接口还需要对权限进行校验，对用户传递的数据加密后再存储，
登录的接口代码如下：
```
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
```
接口的返回要统一格式，方便前端处理，可以封装成统一的方法：
```
module.exports = () => (req, res, next) =>{
  res.success = (data, msg) => {
    let obj = {
      code: 200,
      status: 1,
      data: data
    }
    if(msg){
      obj.msg = msg
    }
    res.json(obj)
  }
  res.error = (error) => {
    res.json({
      status: 0,
      error
    })
  }
  next()
}
```
这样就不用在每个接口都写重复的状态参数了。
作为一个有用户的项目，头像是必不可少的。解决头像上传的方法是将用户上传的图片存储到数据库中，然后将存储的地址保存在用户的记录中（对做后端的来说不值一提^_^）。html中的input可以解决上传文件的问题，但是需要对样式进行处理，而且可能出现一些意想不到的问题。使用cropper.js可以方便实现图片裁剪上传，当然也可以自己造轮子，node里可以通过multer中间件来处理上传的文件。


#### 6.跨域
跨域在Web开发中是老生常谈了，处于安全考虑，浏览器采用同源策略，来防止XSS，CSRF等攻击。而在开发时，由于同源策略，会导致接口不通的情况。因此需要跨域来解决这一问题。
常见的跨域方法有: jsonp，cors，document.domain, iframe, node代理，nginx代理等。在实际中比较靠谱的方法有：
1.开发时：前端通过cli工具进行代理，如在Webpack或vue.config.js中设置proxy，请求要访问的服务端口；后端通过设置Access-Control-Allow-Origin允许某个端口访问，在保持session或要用cookie时，还要进行额外处理，比较简单的方法是安装cors中间件一步处理。
2.部署后：配置nginx，转发特定的前端端口到后端服务端口上。

### 线上部署

#### 1.前端文件部署

前端项目npm run build等打包命令打包之后上传到服务器，放到前端目录中。

#### 2.后端文件部署

将项目上传到服务器上，执行npm install安装依赖。

为了让服务可以在退出node命令时继续运行，需要用到PM2。PM2是Node应用进程管理器，可以永久保持应用程序。

```
npm install -g pm2
pm2 start bin/www
```
通过pm2 list查看服务的运行状况。

#### 3. Nginx配置

在服务器上装好Nginx后，创建配置文件。

```
cd /etc/nginx/conf.d
vi cnode.conf
```

这里Nginx主要用到的功能是监听/转发接口请求，设置静态文件转发路径（前端目录和后端资源目录），设置文件上传大小。当配置完成后，如果依然出现接口不能请求的情况，可能是服务器的安全组没有添加端口，需要在服务器上添加前端请求和后端监听的端口号。通过上述步骤，便能让一个简单的网站运行在服务器上。可以注册不同的用户和自己对话。。。


