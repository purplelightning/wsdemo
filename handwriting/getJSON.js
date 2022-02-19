/* Object.is 只有+0,-0和NaN与 === 不同 */
function objectIs(x, y){
  if(x === y){
    return x!==0 || 1/x === 1/y
  }
  return x!==x && y!==y
}

/* 手写AJAX */
function getJSON(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send()
  })
}

/* 分片思想解决大数据量渲染问题 */
