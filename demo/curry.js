/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b)
  }, 1000)
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest) {
  // 请在此处完善代码
  const promise = [];
  for (let i = 0; i < rest.length; i += 2) {
    promise.push(new Promise((resolve) => {
      if (!rest[i + 1]) {
        resolve(rest[i]);
      } else {
        asyncAdd(i, i + 1, (_, result) => resolve(result));
      }
    }))
  };

  Promise.all(promise).then(result => {
    return sum(...result);
  })
}

let start = window.performance.now()
sum(1, 2, 3, 4, 5, 6).then(res => {
  // 请保证在调用sum方法之后，返回结果21
  console.log(res)
  console.log(`程序执行共耗时: ${window.performance.now() - start}`)
})


function instanceOf(left, right) {
  let proto = left.__proto__;
  while (proto) {
    if (proto === right.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

function myNew(fn, ...rest) {
  if (typeof fn !== 'function') {
    return fn;
  }

  //创建新的对象,关联构造函数的原型对象
  const _constructor = Object.create(fn.prototype);
  //执行构造函数
  const obj = fn.apply(_constructor, rest);
  //如果构造函数执行结果是对象则返回执行结果
  if (typeof obj === 'object') {
    return obj;
  } else {
    return _constructor;
  }
}