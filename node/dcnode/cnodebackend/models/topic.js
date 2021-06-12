const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false); // 解决findoneandupdate报错问题

TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tab: {
    type: String,
    required: true
  },
  author: {
    type: Object,
    required: true
  },
  replyList: {
    type: Array,
    required: true
  },
  createTime: {
    type: String,
    required: true
  },
  top: {
    type: Boolean,
    required: false
  },
  replyCount: {
    type: Number,
    required: false
  },
  visitCount: {
    type: Number,
    required: false
  },
  isCollected:{
    type: Boolean,
    required: false
  }
})

let TopicModel = mongoose.model('topic', TopicSchema)
module.exports = TopicModel