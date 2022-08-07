// 加载模块
const nedb =require('nedb')
import { formatTime } from './common'
 
// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
  filename: 'src/utils/info.db',
  autoload: true
});

export const insertDb = (obj) => {
  db.insert({...obj, updateTime: formatTime()}, (err, ret) => {})
}

export const findOneDb = (obj) => {
  return new Promise((resolve,reject) => {
    db.findOne(obj, async(err, ret) => {
      resolve(ret)
    })
  })
}

// 插入单项
// db.insert({
//   name: 'tom'
// }, (err, ret) => {});
 
// 插入多项
// db.insert(
//   [
//     { name: 'tom' },
//     { name: 'jerry' }
//   ]
// , (err, ret) => {});
 
// // 查询单项
// db.findOne({
//   name: 'tom'
// }, (err, ret) => {});
 
// // 查询多项
// db.find({
//     name: {
//       $in: ['tom', 'jerry']
//     }
//   })
//   .sort({
//     _id: -1
//   })
//   .exec((err, ret) => {});
 
// 更新单项
// db.update({
//   _id: '1'
// }, {
//   $set: {
//     name: 'kitty'
//   }
// }, (err, ret) => {});
 
// // 更新多项
// db.update({}, {
//   $set: {
//     name: 'kitty'
//   }
// }, {
//   multi: true
// }, (err, ret) => {});
 
// // 删除单项
// db.remove({
//   _id: '1'
// }, (err, ret) => {})
 
// // 删除多项
// db.remove({
//   name: 'kitty'
// }, {
//   multi: true
// }, (err, ret) => {});