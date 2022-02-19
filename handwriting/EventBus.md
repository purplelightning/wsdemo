## 手写发布订阅模式
### 发布订阅模式概念
  发布订阅模式定义了一种一对多的关系，让多个观察者对象监听一个主体对象，当主题对象改变时，这些观察者对象都会得到通知。在现实中，当多个客户收藏了一个商品，当商品价格有优惠时，客户便会得到通知，这就是发布订阅模式的一种应用；前端中原生js的addEventListener，jquery中的on，以及Vue中的EventBus，都是发布订阅模式的应用。
### EventBus的简单实现
EventBus主要有四种方法：on, emit, off, once。一个简易的EventBus可以定义如下：
```
class EventBus {
  constructor() {
    this.events = {}
  }
  on() {
  }
  emit() {
  }
  off() {
  }
  once() {
  }
}
```
其中events用于存储监听的事件及事件发生时调用的方法。on方法用于监听事件，存入events对象中，由于一个事件可能回执行多个函数，这些函数要用数组存储：
```
on(type, fn){
  if(this.events[type]){
    this.events[type].push(fn)
  }else{
    this.events[type] = [fn]
  }
}
```
emit方法用于在监听到事件时，执行函数：
```
emit(type, params){
  if(this.events[type]){
    this.events[type].forEach(fn => fn())
  }
}
```
off方法用于解除监听，去掉特定的回调函数：
```
if(this.events[type]){
  this.events[type] = this.events[type].filter(v=> v !== fn)
}
```
once方法监听事件，但是只触发一次。一旦触发之后，监听器就会被移除，因此需要在方法中调用off方法，在监听事件时，需要调用on方法，因此需要一个临时函数用于监听，解除监听，传递参数：
```
once(type, fn){
  function tmp(){
    // 传递参数
    fn(...arguments)
    this.off(type,tmp)
  }
  this.on(type, tmp)
}
```
由于once方法需要传递参数，因此对emit进行修改：
```
if(this.events[type]){
  // 绑定this指向，在tmp中给off指定this
  this.events[type].forEach(fn => fn.apply(this, params))
}
```
最终，完成的EventBus代码如下：
```
class EventBus {
  constructor(){
    this.events = {}
  }
  on(type, fn){
    if(this.events[type]){
      this.events[type].push(fn)
    }else{
      this.events[type] = [fn]
    }
  }
  off(type,fn){
    if(this.events[type]){
      this.events[type] = this.events[type].filter(v=> v !== fn)
    }
  }
  once(type, fn){
    function tmp(){
      // 传递参数
      fn(...arguments)
      this.off(type,tmp)
    }
    this.on(type, tmp)
  }
  emit(type, params){
    if(this.events[type]){
      // 绑定this指向，在tmp中给off指定this
      this.events[type].forEach(fn => fn.apply(this, params))
    }
  }
}
```
### 测试
将EventBus.js代码引入Vue项目的utils目录下，引入到子组件guide1，guide2中。guide2用于派发事件，guide1用于监听事件：
```
// guide2
<div class="guide2">
  <el-button @click="add">发布订阅测试</el-button>
</div>
...
import EventBus from '../../utils/EventBus'
...
methods:{
  add(){
    EventBus.emit('add',100)
  }
}
// guide1
<div class="guide1">
  <div class="item">num1：{{ num1 }}</div>
  <div class="item">num2：{{ num2 }}</div>
</div>
...
export default {
  data() {
    return {
      num1: 0,
      num2: 0,
    };
  },
  mounted() {
    EventBus.on("add", (data) => {
      this.num1 += data;
    });
    EventBus.once("add", (data) => {
      this.num2 += data;
    });
  },
}
// 父组件
<div class="guide-wrapper">
  <guide1></guide1>
  <guide2></guide2>
</div>
```

在子组件中定义了监听add事件的两种方法，一种可以执行多次，一种只执行一次，在多次点击按钮后，num1变成了600，而num2只在第一次点击变成100，之后不再变化，验证了EventBus可以起到效果。