#### Promise介绍
  Promise是在ES6中引入用来解决异步编程的方案。Promise有3种状态：pending, fullfilled, rejected。状态的改变分为从pending到fullfilled和从pending到rejected两种。Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。resolve将Promise对象状态从未完成变为成功，reject将状态从未完成变成失败，用then方法对resolve, reject传递的参数进行处理。then方法可以返回一个新的Promise对象，可以进行链式调用；如果调用出错，则可以可以在catch方法中进行捕获。Promise创建的实例在Event Loop中属于MicroTask，会被推送到微任务执行栈中等待调用。
#### 手写Promise需要考虑的内容
1. promise在进行异步操作的时候，resolve或reject不会立即执行，因此then方法需要对Promise对象状态进行判断，判断回调函数执行时机
2. 一个promise实例可以执行多次then方法，promise对象返回的结果可能有多个，因此需要数组对回调函数进行存储
3. promise可以进行链式调用，then方法需要返回一个新的promise对象
4. then方法返回的新的promise对象不能是当前promise对象，要对循环引用判断
5. 对循环引用判断时，要对then方法返回的promise对象进行判断，因此需要创建微任务进行初始化
6. 只有当状态为pending时，resolve和reject才需要被调用
7. Promise.resolve方法会返回一个Promise对象，需要判断入参是Promise对象还是普通参数
8. then方法回调函数传递的参数不确定，需要兼容性处理
#### 基本代码
基本的Promise代码如下：
```
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MyPromise{
  constructor(executor){
    this.status = PENDING
    this.value = null
    this.reason = null
    this.onFullFilledCallbacks = []
    this.onRejectedCallbacks = []
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve = (val) => {
    // 状态为pending才需要处理
    if(this.status === PENDING){
      this.status = FULLFILLED
      this.value = val
      while(this.onFullFilledCallbacks.length){
        this.onFullFilledCallbacks.shift()(val)
      }
    }
  }

  reject = (reason) => {
    // 状态为pending才需要处理
    if(this.status === PENDING){
      this.status = REJECTED
      this.reason = reason
      while(this.onRejectedCallbacks.length){
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFullFilled, onRejected){
    const realFullFilled = typeof onFullFilled === 'function' ? onFullFilled : x => x
    const realRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    const p2 = new MyPromise((resolve,reject) => {
      const fullTask = ()=> {
        queueMicrotask(() => {
          try {
            const x = realFullFilled(this.value)
            handlePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectTask = () => {
        queueMicrotask(()=>{
          try {
            let x = realRejected(this.reason)
            handlePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.status === FULLFILLED){
        fullTask()
      }else if(this.status === REJECTED){
        rejectTask()
      }else if(this.status === PENDING){
        this.onFullFilledCallbacks.push(fullTask)
        this.onRejectedCallbacks.push(rejectTask)
      }
    })
    return p2
  }
  static resolve(params){
    if(params instanceof MyPromise){
      return params
    }
    return new MyPromise(resolve => {
      resolve(params)
    })
  }
  static reject(reason){
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
// 对返回值进行统一处理
function handlePromise(p2, x, resolve,reject){
  if(p2 === x){
    reject(new TypeError('循环引用'))
  }
  if(x instanceof MyPromise){
    x.then(resolve, reject)
  }else{
    resolve(x)
  }
}
```
#### 添加all和race方法
Promise.all()方法用于将多个Promise实例，包装成一个新的Promise实例, 接受一个数组作为参数，当实例状态都变为fullfilled时，将实例返回值的数组返回；Proimse.race()方法则是返回状态最先改变的Promise实例的返回值
```
  static all(promiseArr){
    let arr = [], count = 0, total = promiseArr.length
    return new MyPromise((resolve, reject) => {
      for(let i=0;i < promiseArr.length;i++){
        MyPromise.resolve(promiseArr[i]).then(
          res => {
            arr[i] = res
            count++
            if(count === total){
              resolve(arr)
            }
          }, err => {
            reject(err)
          }
        )
      }
    })
  }
  static race(promiseArr){
    return new MyPromise((resolve, reject) => {
      for(let i=0; i< promiseArr.length;i++){
        MyPromise.resolve(promiseArr[i]).then(res=>{
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
```
验证all和race方法：
```
function setTask(delay, val) {
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(val)
    }, delay * 1000)
  })
}

let c1 = setTask(2.5, 'aaa')
let c2 = setTask(2, 'bbb')
let c3 = setTask(3, 'ccc')
let c4 = 4
let c5 = MyPromise.resolve(5)
let c6 = setTask(1,'eee')

MyPromise.all([c1, c2, c3, c4, c5, c6]).then(res => {
  console.log(res)
})

MyPromise.race([c1, c2, c3, c6]).then(res => {
  console.log(res)
})

```

可以看到all方法返回值为promise数组实例的返回值组成的数组，对应的顺序不变；而race方法返回值为最快执行的c6任务的返回值。这样基本的手写Promise代码就完成了，如果需要通过Promise A+规范的话需要对handlePromise进行修改，有兴趣的读者可以自行尝试。