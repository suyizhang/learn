(function (global, factory) {
  'use strict';
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(global, true);
  } else {
    factory(global);
  }
})(
  (function () {
    if (typeof window !== 'undefined') {
      return window;
    }

    if (typeof self !== 'undefined') {
      return self;
    }

    return this;
  })(),
  function (global, noGlobal) {

    class Suyi {
      init () {
        console.log('init');
        console.log(this);
      }
    }
    
    if (typeof noGlobal === 'undefined') {
      global.Suyi = new Suyi();
    }

    return new Suyi();;
  }
);


function myInstanceof(target, origin) {
  while(target) {
    if (target.__proto__ === origin.prototype) {
      return true;
    }
    target = target.__proto__;
    return false;
  }
}