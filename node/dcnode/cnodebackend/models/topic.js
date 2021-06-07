const mongoose = require('mongoose');

TopicSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
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
})

let TopicModel = mongoose.model('topic', TopicSchema)
module.exports = TopicModel