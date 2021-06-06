const mongoose = require('mongoose');
const { DB_URL } = require('../config');

//调试模式
mongoose.set('debug', true)

const db = mongoose.createConnection(DB_URL)

db.on('error', () => console.log('数据库连接失败'))

db.on('connected', () => console.log('数据库连接成功'))

module.exports = db;