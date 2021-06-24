const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/', async (ctx, next) => {
  ctx.body = 'body';
  // next();
});

// get取值
router.get('/news', async (ctx, next) => {
  // locathost:3000/news?aid=123
  console.log(ctx.query);// 获取参数对象 {aid: 123}
  console.log(ctx.querystring); // aid=123

  console.log(ctx.request);
});

// 动态路由  可以多个
router.get('/content/:id/:cos', async (ctx, next) => {
  // http://localhost:3000/content/23/213
  console.log(ctx.params); // { id: 23, cos: 213 }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
