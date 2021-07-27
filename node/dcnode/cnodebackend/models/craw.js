const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false); // 解决findoneandupdate报错问题

MoocVideoSchema = new mongoose.Schema({
  courseName:{ type: String, required: true},
  title: { type: String, required: true},
  duration: { type: String, required: false},
  url: { type: String, required: true},
  name: { type: String, required: true},
  author: { type: String, required: true},
  coursePrice: { type: String, required: true},
  courseUrl: { type: String, required: true},
})

let MoocVideoModel = mongoose.model('moocVideo', MoocVideoSchema)

MoocCourseSchema = new mongoose.Schema({
  courseName:{ type: String, required: true},
  coursePrice: { type: String, required: true},
  courseUrl: { type: String, required: true},
  imgUrl: { type: String, required: true},
  courseType: { type: String, required: true},
  numOfStudents: { type: String, required: true},
})

let MoocCourseModel = mongoose.model('moocCourse', MoocCourseSchema)

MangaSchema = new mongoose.Schema({
  title:{ type: String, required: true},
  chapterName: { type: String, required: true},
  chapterUrl: { type: String, required: true},
})

let MangaModel = mongoose.model('manga', MangaSchema)



module.exports = { MoocVideoModel, MoocCourseModel, MangaModel}