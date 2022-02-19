
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

/**
 *  原型链继承
 * 多个实例对引用类型的操作会被篡改。
**/
SubType.prototype = new SuperType()

/**构造函数继承
使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）
缺点： 只能继承父类的实例属性和方法，不能继承原型属性/方法 无法实现复用，每个子类都有父类实例函数的副本，影响性能
**/
function SubType(){
  SuperType.call(this)
}
/*
  组合继承：原型链继承+构造函数继承
  缺点：在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。
*/ 
function SubType(name, age){
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}
// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType(); 
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){
    alert(this.age);
};

/* 原型继承
 以传入的对象为原型，产生新的对象；原型式继承中, 包含引用类型值的属性始终都会共享相应的值, 就像使用原型模式一样，无法传递参数
*/
function object(o){
  function F(){}
  F.prototype = o
  return new F()
}
// 代替方法
Object.create(o)
// 定义属性，可选
Object.create(o, { name: 'ss' })

/* 寄生式继承
  核心：在原型式继承的基础上，增强对象，返回构造函数
  函数的主要作用是为构造函数新增属性和方法，以增强函数
  缺点：（同原型继承）原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
        无法传递参数
*/
function SubType(original){
  let clone = object(original)
  clone.sayHi = function(){
    console.log('hi')
  }
  return clone
}
/*  寄生组合式继承  这是最成熟的方法，也是现在库实现的方法
  只调用了一次SuperType 构造函数，避免了在SubType.prototype 上创建不必要的、多余的属性；原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf()
*/
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}
// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}
// 将父类原型指向子类
inheritPrototype(SubType, SuperType);
// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}
var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);
instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]

/*
  extends继承
*/

