const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }
  status = PENDING
  value = null
  reason = null
  onFullFilledCallbacks = []
  onRejectedCallbacks = []

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULLFILLED
      this.value = value
      while (this.onFullFilledCallbacks.length) {
        this.onFullFilledCallbacks.shift()(value)
      }
    }
  }

  reject = reason => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }
  then(onFullFilled, onRejected) {
    const onRealFull = typeof onFullFilled === 'function' ? onFullFilled : x => x
    const onRealReject = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const p2 = new MyPromise((resolve, reject) => {
      const fullFillTask = () => {
        queueMicrotask(() => {
          try {
            let x = onRealFull(this.value)
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectTask = () => {
        queueMicrotask(() => {
          try {
            let x = onRealReject(this.reason)
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === FULLFILLED) {
        fullFillTask()
      } else if (this.status === REJECTED) {
        rejectTask()
      } else if (this.status === PENDING) {
        this.onFullFilledCallbacks.push(fullFillTask)
        this.onRejectedCallbacks.push(rejectTask)
      }
    })
    return p2
  }

  static resolve(param) {
    if (param instanceof MyPromise) {
      return param
    }
    return new MyPromise(resolve => {
      resolve(param)
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}

// 符合A+规范。。。挺麻烦的
function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then 
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}


MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}
module.exports = MyPromise;
