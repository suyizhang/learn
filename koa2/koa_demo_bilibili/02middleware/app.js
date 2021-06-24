const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

// 应用级中间件
app.use(async (ctx, next) => {
  ctx.body = '中间件';
  console.log(new Date());
  await next();
  if (ctx.status === 404) {
    ctx.body = '404';
  }

});



router.get('/', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    a: 123,
  };
  // next();
});

// 路由级中间件
router.get('/news', async (ctx, next) => {
  await next();
});

router.get('/news', async (ctx, next) => {
  // next();
  ctx.body = 'xinwen';
});



app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);