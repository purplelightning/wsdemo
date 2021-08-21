## Express实践

### 背景
在国内的大环境下，仅了解前端方面的内容并不够，需要对后端的内容有一定了解，而Node作为运行在服务端的JavaScript，是前端人员学习后端最容易上手的语言。Express作为一个老牌Node框架，在今天依然有很高的流行度，值得学习；Mongodb是非关系型数据库，通过使用mongoose可以进行快速的开发，适合前端人员的学习。本文实现一个类似CNODE中文社区的网站，技术栈为：Node+Express+MongoDB+Vue。

### 环境准备
Node.js 14.0.0，express 4.16.1，MongoDB3.4.4，用到的库：mongoose(操作mongodb)，cors（跨域），jsonwebtoken(jwt中间件)，multer(文件上传)，morgan(日志记录)。

#### 1.创建项目

全局安装Node，express，express-generator，创建express项目

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

#### 2.数据库设计

MongoDB中用集合和文档来描述数据库，集合相当于关系数据库中的表，文档相当于关系数据库中的行

项目建立的集合为：

users：用户信息，包括_id，name，phone，avatarImg，

topics: 话题信息，包括_id，title，content，

collections：收藏的话题，单独建立收藏表可以

#### 3.路由开发

在routes目录下新建users.js, topics.js, collections.js,

需要实现的接口请求主要包括用户，话题和收藏

#### 4.权限控制

```
npm install jsonwebtoken
```

设置jwt的过期时间，密钥，当用户请求的接口中需要判断权限时，根据用户传递的header判断用户是否登录，token是否过期，如果不能满足情况，则返回4xx响应，前端根据响应清除登陆状态，跳转到登陆页面。



### 线上部署

#### 1.前端文件部署

前端项目npm run build打包之后上传到服务器，放到前端目录中。

#### 2.后端文件部署

将项目上传到服务器上，执行npm install安装依赖。

为了让服务可以在退出node命令时继续运行，需要用到PM2。PM2是Node应用进程管理器，可以永久保持应用程序。

```
npm install -g pm2
pm2 start bin/www
```

通过pm2 list查看程序

#### 3. Nginx配置

在服务器上装好Nginx后，创建配置文件。

```
cd /etc/nginx/conf.d
vi cnode.conf
```

这里Nginx主要用到的功能是监听/转发接口请求，设置静态文件转发路径（前端目录和后端资源目录），设置文件上传大小。当配置完成后，如果依然出现接口不能请求的情况，可能是服务器的安全组没有添加端口，需要在服务器上添加前端请求和后端监听的端口号。

