const Koa = require('koa')
const app = new Koa()
// koa-session
const session = require('koa-session')

app.keys = ['some secret']

// 配置
const SESS_CONFIG = {
  // cookie key
  key: 'kkb:session',
  // 过期时间
  maxAge: 86400000,
  // 仅服务器修改 网络安全
  httpOnly: true,
  // 签名cookie
  signed: true
}

// 注册
app.use(session(SESS_CONFIG, app))

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return
  // 获取
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  ctx.body = '第' + n + '次访问'
})

app.listen(3000)