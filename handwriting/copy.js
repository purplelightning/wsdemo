// 深拷贝：考虑基本类型，引用类型，数组，循环引用
function deepClone1(target, map = new Map()){
  if(typeof target !== 'object'){
    return target
  }else{
    let newTarget = Array.isArray ? [] : {}
    if(map.get(target)){
      return map.get(target)
    }
    map.set(target, newTarget)
    for(const key in target){
      newTarget[key] = deepClone1(target[key], map)
    }
    return newTarget
  }
}

// WeakMap用于性能优化，键是弱引用的，是对象，解决循环引用问题一个对象若只被弱引用所引用，
// 则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收，垃圾回收机制可以自动回收

