const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

const jwt = require('jsonwebtoken')
// 鉴权中间件
const jwtAuth = require('koa-jwt')

const app = new Koa();

app.use(bodyParser())
app.use(static(__dirname, '/'))

const secret = 'it is a secret'

router.post('/login-token', async ctx => {
  const { body } = ctx.request
  // 登陆逻辑
  const userInfo = {
    username: body.username,
    password: body.password,
  }
  ctx.body = {
    message: '登陆成功',
    user: userInfo,
    // 生成token 签名
    token: jwt.sign({
      data: userInfo,
      // 过期时间 单位是s
      exp: Math.floor(new Date() / 1000) + 60 * 60
    },
      secret
    )
  }
})

router.get('/getUser-token', jwtAuth({ secret }), async ctx => {
  // 鉴权通过 ctx.state.user
  console.log('state', ctx.state)
  ctx.body = {
    message: '获取成功',
    userinfo: ctx.state.user.data
  }
})

app.use(router.routes())
app.listen(3000, () => console.log('连接成功'))