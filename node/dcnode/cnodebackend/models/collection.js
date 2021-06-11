const mongoose = require('mongoose');

CollectionSchema = new mongoose.Schema({
  collectUserId:{
    type: String,
    required: true
  },
  collectTopicId:{
    type: String,
    required: true
  },
  topicTitle:{
    type: String,
    required: true
  },
  createTime:{
    type: String,
    required: false
  }
})

const CollectionModel = mongoose.model('collection', CollectionSchema)
module.exports = CollectionModel
