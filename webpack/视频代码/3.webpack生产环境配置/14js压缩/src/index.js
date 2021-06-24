// import '@babel/polyfill';
// 这样会全部引用  不推荐

const add = (x, y) => {
  return x + y;
}

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(123);
  }, 100)
})
promise.then((res) => {
  console.log(res);
})

console.log(add(2, 2));
