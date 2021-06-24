const koa = require('koa');
const KittenModel = require('./model.js');
const mongoose = require('mongoose');

const app = new koa();

const Kitten = mongoose.model('Kitten');

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  const newKitten = new Kitten({ name: '123' });
  const kitten = await newKitten.save();
  ctx.status = 200;
  ctx.body = {
    message: '请求成功',
    data: {
      kitten: kitten,
    }
  };
});

app.listen(3000);
