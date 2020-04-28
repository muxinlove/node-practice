// const Koa = require('koa')
// const app = new Koa()

// app.use((ctx, next) => {
//   ctx.body = '测试'
// })

// app.listen('3000')


const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class KKoa {
  constructor() {
    // 初始化中间件数组
    this.middlewares = []
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // 创建上下文 context
      const ctx = this.createContext(req, res)

      // 中间件合成
      const fn = this.compose(this.middlewares);

      // 执行合成函数 并传入ctx
      await fn(ctx)

      res.end(ctx.body)
    })

    server.listen(...args)
  }

  compose(middlewares) {
    return ctx => {
      // 执行第一个中间件函数
      return dispatch(0)

      function dispatch(i) {
        const fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, () => {
            // 执行下一个中间件函数
            return dispatch(i + 1)
          })
        )
      }
    }
  }

  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.request.res = res
    return ctx
  }

  use(callback) {
    this.middlewares.push(callback)
  }
}

module.exports = KKoa