// const Koa = require('koa')
const Koa = require('./kkoa.js')
const app = new Koa()


const static = require('./static')
app.use(static(__dirname + '/public'))


const Router = require('./router.js')
const router = new Router()

router.get('/index', async (ctx) => ctx.body = 'get index page')
router.get('/list', async (ctx) => ctx.body = 'get list page')
router.post('/index', async (ctx) => ctx.body = 'post index page')

// 路由实例输出父中间件 router.routes()
app.use(router.routes())

// app.use(async (ctx, next) => {
//   console.log(`fn1 start ${new Date().toLocaleDateString()}`)
//   await next()
//   console.log(`fn1 end ${new Date().toLocaleDateString()}`)
// })

// app.use(async (ctx, next) => {
//   console.log(`fn2 start ${new Date().toLocaleDateString()}`)
//   await delay()
//   await next()
//   console.log(`fn2 end ${new Date().toLocaleDateString()}`)
// })

// app.use(async (ctx, next) => {
//   console.log(`fn3 start ${new Date().toLocaleDateString()}`)
//   await next()
//   console.log(`fn3 end ${new Date().toLocaleDateString()}`)
// })

const port = '3000'
app.listen(port, () => {
  console.log(port + ' 连接成功');
})


function delay() {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve()
    }, 2000);
  })
}