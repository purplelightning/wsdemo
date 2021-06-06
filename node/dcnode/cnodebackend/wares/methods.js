module.exports = () => (req, res, next) =>{
  res.success = (data, msg) => {
    let obj = {
      code: 200,
      status: 1,
      data: data
    }
    if(msg){
      obj.msg = msg
    }
    res.json(obj)
  }
  res.error = (error) => {
    res.json({
      status: 0,
      error
    })
  }
  next()
}