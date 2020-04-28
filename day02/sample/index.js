const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
  ctx.body = [
    {
      name: 'tom'
    }
  ]
  next()
})

// 路由对象
const router = {}
router['/html'] = ctx => {
  ctx.type = 'text/html;charset=utf-8'
  ctx.body = `<b>我的名字是${ctx.body[0].name}</b>`
}

app.use(ctx => {
  console.log('url', ctx.url);
  router[ctx.url](ctx);
})
app.listen(3000)