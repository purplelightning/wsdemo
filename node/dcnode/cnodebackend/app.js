let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/user');
let topicRouter = require('./routes/topic');
let collectionRouter = require('./routes/collection');
const methods = require('./wares/methods');

let cors = require('cors');// 跨域

let app = express();

//跨域  后期删
// app.all('*', function(req, res, next) {
  // console.log(req);
  // res.header("Access-Control-Allow-Origin", "http://localhost:8888"); //为了跨域保持session，所以指定地址，不能用*
  // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  // // 用来跨域，否则安装CORS插件
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  // res.header('Access-Control-Allow-Credentials', true); 
  // res.header("Content-Type", "application/json;charset=utf-8");
  // next();
// });


app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methods())

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/topic', topicRouter)
app.use('/collection', collectionRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
