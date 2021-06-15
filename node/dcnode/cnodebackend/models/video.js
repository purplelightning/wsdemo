const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false); // 解决findoneandupdate报错问题

VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: false
  },
  id: {
    type: String,
    required: true
  },
})

let VideoModel = mongoose.model('video', VideoSchema)
module.exports = VideoModel