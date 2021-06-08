const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const sign = (payload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: 600 //单位秒
  })
}

const verify = () => (req, res, next) => {
  let token = req.headers.authorization
  if(token){
    jwt.verify(token, SECRET, (err, payload) => {
      if(err){
        res.status(403).error('token过期或无效')
      }else{
        next()
      }
    })
  }else{
    res.status(401).error('请提供jwtToken')
  }
}

module.exports = {
  sign,
  verify
}