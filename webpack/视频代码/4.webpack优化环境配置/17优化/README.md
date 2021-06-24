# 性能优化

## 开发环境性能优化
* 优化打包构建速度
  * HMR 模块热替换  style-loader 
* 优化代码调试
  * source-map

## 生产环境性能优化
* 优化打包构建速度
  * oneOf 一种文件只执行一种loader处理
  * babel缓存开启
  * 多进程打包  thread-loader 启动缓慢 可以预热进程
  * externals 打包忽略第三方包 将包使用cdn插入到html中
  * dll 忽略第三方包 配合add-asset-html-webpack-plugin 插入第三包至项目这种
* 优化代码运行性能
  * 缓存(hash chunkhash contenthash)
  * tree shaking(es6 module 开启  'production'中自动开启)
  * code solit(代码分割) 防止重复打包   1. optimization -> splitChunks  2.多入口 缺点： 只能吧库拆分成一个JS文件
  * 懒加载 预加载 import同步加载文件 -> webpackChunkName：懒加载配置   webpackPrefetch: 预加载
  * pwa
