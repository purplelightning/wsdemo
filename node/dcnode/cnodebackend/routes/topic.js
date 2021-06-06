let express = require('express');
let router = express.Router();

const url = require('url');

const Topic = require('../models/topic');

router.get('/list', (req, res) => {
  console.log(req);
  const obj = url.parse(req.url, true).query
  console.log(obj);
  Topic.find(obj, (err, docs) => {
    if(err){
      console.log(err);
    }else{
      res.success(docs)
    }
  })
})


module.exports = router;