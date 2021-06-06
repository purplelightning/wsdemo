const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    requried: true
  },
  avatarImg: {
    type: String,
    required: false
  },
  topicList: {
    type: Array,
    required: false 
  },
  favTopicList: {
    
  }
}) 

let UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel