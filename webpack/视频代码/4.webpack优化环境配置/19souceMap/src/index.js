import './index.less';

function add(a, b) {
  return a + b;
}

add(123, 23);

if(module.hot) {
   // 存在说明开启HMR功能
   module.hot.accpet('./index.js', function() {
     // hot
   })
}