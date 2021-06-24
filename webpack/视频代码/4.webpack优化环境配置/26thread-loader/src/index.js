import './index.less';
import { sum } from './test';

console.log(sum(3, 4));

//注册serviceworker
// 处理兼容性

/**
 * sw 代码必须运行在服务器上
 */
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => {
      console.log('注册成功');
    })
    .catch(() => {
      console.log('注册失败');
    })
  });
}