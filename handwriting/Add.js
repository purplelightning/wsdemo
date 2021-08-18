function curry(fn, ...params){
  return function(...args){
    let _args = [...params, ...args]
    if(!args.length){
      return fn.apply(this, _args)
    }else{
      return curry.call(this, fn, ..._args)
    }
  }
}
function tmp(...arr){
  return arr.reduce((a,b)=>a+b,0)
}
let add = curry(tmp)
console.log(add(1)(2)(3)())
console.log(add(1,2,3)())
console.log(add(1,2,3)(4,5,6)())

/* call和apply传参区别：
  call和apply第一个参数都是要指向的对象；call会把后面的参数原封不动的传给arguments，如果第二个参数是数组，
  则可以在函数中直接使用第一个形参作为数组；apply第二个参数只能是数组，也只会传递第二个参数，并且会把数组
  展开传给arguments，如果在函数中要用数组，必须把arguments转回成数组。 
*/

function logg(arr){
  console.log(arr)
  console.log(arguments)
}

brr=[1,2,3]
logg.call(this, brr,4,5,6)
logg.call(this, 1,2,3)
logg.apply(this, brr,4,5,6)