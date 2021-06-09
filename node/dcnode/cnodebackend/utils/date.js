const formatDate = (t = new Date()) => {
  return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()+1}:${t.getSeconds()}`
}

module.exports = { formatDate }