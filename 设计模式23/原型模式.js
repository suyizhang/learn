var someCar = {
  drive: function () {},
  name: '马自达3',
};

// 使用Object.create创建一个新车x
var anotherCar = Object.create(someCar);
anotherCar.name = '丰田佳美';

var vehicle = {
  getModel: function () {
    console.log('车辆的模具是：' + this.madel);
  },
};

var car = Object.create(vehicle, {
  id: {
    value: 1,
    enumerable: true,
  },
  model: {
    value: '福特',
    enumerable: true,
  },
});


function create(obj) {
  const A = function () {};
  A.prototype = obj;
  return new A();
}

