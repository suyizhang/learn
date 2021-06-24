// import { mul } from './test';

console.log('index.js文件被加载');


document.querySelector('#btn').onclick = function() {
  // 懒加载 webpackChunkName 需要使用时才会加载
  // webpackPrefetch 预加载 会在使用之前  提前加载js文件
  // 正常加载可以认为是并行加载（同时加载多个文件） 预加载等其他资源加载完毕 再加载
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test.js').then((result) => {
    const { mul } = result;
    console.log(mul(34,1));
  });
}