
// 桥接模式（Bridge）将抽象部分与它的实现部分分离，使它们都可以独立地变化。
// 其实就是函数的封装，比如要对某个DOM元素添加color和backgroundColor，可以封装个changeColor函数，这样可以在多个相似逻辑中提升智商...

function Speed(x, y) {
  this.x = x;
  this.y = y;
}

Speed.prototype.run = function() {
  console.log('跑起来');
}

function Color(cl) {
  this.color = cl;
}

Color.prototype.draw = function() {
  console.log('着色');
}

function Shape(sp) {
  this.shape= sp;
}

Shape.prototype.change = function() {
  console.log('改变形状');
}

function Speek(wd) {
  this.word = wd;
}

Speek.prototype.say = function() {
  console.log('书序')
}

function Ball(x, y, c) {
  this.speed = new Speed(x, y);
  this.color = new Color(c);
}

Ball.prototype.init = function() {
  this.speed.run();
  this.color.draw();
}

function People(x, y, f) {
  this.speed = new Speed(x, y);
  this.font = new Speek(f);
}

People.prototype.init = function() {
  this.speed.run();
  this.font.say();
}

function Spirite(x, y, c, s) {
  this.speed = new Speed(x, y);
  this.color = new Color(c);
  this.shape = new Shape(s);
}


Spirite.prototype.init = function() {
  this.speed.run();
  this.color.draw();
  this.shape.change();
}

var p = new People(10, 12, 16);
p.init();


Object.prototype.addMethod = function(name, fn) {
  this.__proto__[name] = fn;
}


function Box(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

let box = new Box(1, 2, 3)

box.addMethod('init', function() {
  console.log(this.x, this.y, this.z);
})

box.addMethod('getWidth', function() {
  console.log(this.w);
})

const http = require('http');

// http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<meta charset="UTF-8"><h1>dadaqianduan</h1>');
//   res.end();
// }).listen(3000);