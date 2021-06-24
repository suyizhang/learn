function sum() {
  return arguments[0] + arguments[1];
}

/**
 * import 动态导入语法  能将某个文件单独打包
 */
import(/* webpackChunkName: 'test' */'./test').then((result) => {
  console.log(result);
  const { mul } = result;
  console.log(mul(3, 4));
})
console.log(sum(3, 4));