//  工厂模式
var  Factory = function(type, content) {
  if (this instanceof Factory) {
    return new this[type](content);
  } else {
    return new Factory(type, content);
  }
}

Factory.prototype = {
  Java: function(content) {},
  JavaScript: function(content) {

    this.content = content;
    (function(content) {
      let div = document.createElement('div');
      div.innerHTML = content;
      div.style.border= '1px solid red';
      document.getElementById('container').appendChild(div);
    })(content);
  },
}


// 抽象工厂
let VehicleFactory = function(subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {
    function F() {}
    F.prototype = new VehicleFactory[superType]();
    subType.constructor = subType;
    subType.prototype = new F();
  } else {
    throw new Error('未创建该抽象类');
  }
}

VehicleFactory.Car = function() {
  this.type = 'Car';
}
VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用')
  }
};

VehicleFactory.Bus = function() {
  this.type = 'Bus';
}
VehicleFactory.Bus.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用')
  }
};

var BMW = function(price, speed) {
  this.price = price;
  this.speed = speed;
};

VehicleFactory(BMW, 'Car');

BMW.prototype.getPrice = function() {
  return this.price;
}

BMW.prototype.getSpeed = function() {
  return this.speed;
}