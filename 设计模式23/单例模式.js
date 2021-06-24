function Universe() {
  var instance = this
  Universe = function() {    // 重写构造函数
      return instance
  }
}
var uni1 = new Universe()
var uni2 = new Universe()


const LazySingle = (function() {
  let _instance              // 单例的实例引用
 
  function Single() {        // 单例构造函数
    const desc = '单例'        // 私有属性和方法
    return {                   // 暴露出来的对象
      publicMethod: function() {console.log(desc)},
      publickProperty: '1.0'
    }
  }
  
  return function() {
    return _instance || (_instance = Single())
  }
})()

console.log(LazySingle()===lazySingle())        // true
console.log(LazySingle().publickProperty)   



function Universe() {
  var instance = this
  Universe = function() {
      return instance
  }
}
Universe.prototype.nothing = true
var uni1 = new Universe()
Universe.prototype.enthing = true
var uni2 = new Universe()
console.log(uni1 === uni2) // true