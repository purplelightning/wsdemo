const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor){
    this.status = PENDING
    this.reason = null
    this.value =null
    this.onFullfilledCallBacks = []
    this.onRejectedCallBacks = []
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  

  resolve = val => {
    if(this.status === PENDING){
      this.status = FULLFILLED
      this.value = val
      while(this.onFullfilledCallBacks.length){
        this.onFullfilledCallBacks.shift()(val)
      }
    }
  }
  reject = reason => {
    if(this.status === PENDING){
      this.status = REJECTED
      this.reason = reason
      while(this.onRejectedCallBacks.length){
        this.onRejectedCallBacks.shift()(reason)
      }
    }
  }
  then(onFullfilled, onRejected){
    const realFullfilled = typeof onFullfilled === 'function' ? onFullfilled : x => x
    const realRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    const p2 = new MyPromise((resolve, reject) => {
      const fullTask = () => {
        queueMicrotask(()=>{
          try {
            let value = realFullfilled(this.value)
            resolvePromise(p2, value, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectTask = () => {
        queueMicrotask(()=>{
          try {
            let reason = realRejected(this.reason)
            resolvePromise(p2, reason, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.status === FULLFILLED){
        fullTask()
      }else if(this.status === REJECTED){
        rejectTask()
      }else{
        this.onFullfilledCallBacks.push(fullTask)
        this.onRejectedCallBacks.push(rejectTask)
      }
    })
    return p2
  }
  static resolve(params){
    if(params instanceof MyPromise){
      return params
    }
    return new MyPromise(resolve=>{
      resolve(params)
    })
  }
  static reject(reason){
    return new MyPromise((resolve,reject)=>{
      reject(reason)
    })
  }
  /* 添加all和race方法 */
  static all(arr){
    let count = 0
    let brr = []
    return new MyPromise((resolve, reject) => {
      for(let i=0;i<arr.length;i++){
        MyPromise.resolve(arr[i]).then(res => {
          brr[i]=res
          count++
          if(count === arr.length){
            resolve(brr)
          }
        }, err=>{
          reject(err)
        })
      }
    })
  }
  static race(arr){
    return new MyPromise((resolve,reject)=>{
      for(let i=0;i<arr.length;i++){
        // promise数组只要有任何一个promise 状态变更  就可以返回
        Promise.resolve(arr[i]).then(res=>{
          resolve(res)
        },err=>{
          reject(err)
        })
      }
    })
  }
}

function resolvePromise(p2, x,resolve,reject){
  if(p2===x){
    reject(new Error('cycle'))
  }
  if(x instanceof MyPromise){
    x.then(resolve,reject)
  }else{
    resolve(x)
  }
}

/* Promise.all，race测试 */
function setTask(delay, val) {
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(val)
    }, delay * 1000)
  })
}

var c1 = setTask(2.5, 'aaa')
var c2 = setTask(2, 'bbb')
var c3 = setTask(3, 'ccc')
var c4 = 4
var c5 = MyPromise.resolve(5)
var c6 = setTask(1,'eee')

MyPromise.all([c1, c2, c3, c4, c5, c6]).then(res => {
  console.log(res)
})

MyPromise.race([c1, c2, c3, c6]).then(res => {
  console.log(res)
})