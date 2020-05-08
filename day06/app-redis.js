// 一般使用redis存储session
const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')

// redis做promise封装
const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys = ['som secret']

app.use(session({
  key: 'kkb:session',
  store: redisStore({ client })
}, app))

app.use(async (ctx, next) => {
  // 获取所有键值对

  const keys = await client.keys('*')
  keys.forEach(async key => console.log(await client.get(key)))
  await next()
})

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return
  // 获取
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  ctx.body = '第' + n + '次访问'
})

app.listen(3000, () => console.log('连接成功'))