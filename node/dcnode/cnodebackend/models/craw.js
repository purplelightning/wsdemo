const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false); // 解决findoneandupdate报错问题

CrawSchema = new mongoose.Schema({
  courseName:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  coursePrice:{
    type: String,
    required: true
  },
  courseUrl:{
    type: String,
    required: true
  },
})

let CrawModel = mongoose.model('mooc', CrawSchema)
module.exports = CrawModel