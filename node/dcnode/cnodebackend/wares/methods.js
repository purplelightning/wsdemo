module.exports = () => (req, res, next) =>{
  res.success = (data) => {
    res.json({
      code: 200,
      status: 1,
      data
    })
  }
  res.error = (error) => {
    res.json({
      status: 0,
      error
    })
  }
  next()
}