// import { add } from './add';
import { count } from './count';

console.log('index.js~');

import(/* webpackChunkName: 'add' */'./add').then((result) => {
  const { add } = result;
  console.log(add);
})

// console.log(add(1, 5));
console.log(count(1, 5));