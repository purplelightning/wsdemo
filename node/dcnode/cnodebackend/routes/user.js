let express = require('express');
let router = express.Router();
let crypto = require('crypto');

const User = require('../models/user');

router.get('/test', async(req, res) => {
  res.success('接口测试返回')
})


// router.post('/signup', async (req, res) => {
//   let md5 = crypto.createHash('md5')
//   let pwd = md5.update(req.body.password).digest('base64')
//   User.find({ name: req.body.username }, (err, docs) =>{
//     if(err){
//       console.log(err);
//       return
//     }
//     if(docs.length){

//     }
//   })
// })


module.exports = router;
