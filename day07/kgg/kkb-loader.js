// 路由加载器
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')

function load(dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir)
  // 读取路径下的文件
  const files = fs.readdirSync(url)
  // 遍历路由文件
  files.forEach(filename => {
    // 去掉后缀
    filename = filename.replace('.js', '')
    const file = require(url + '/' + filename)
    // 处理
    cb(filename, file)
  })
}

/**
 * 加载路由配置
 */
function initRouter(app) {
  const router = new Router()
  load('routes', (filename, routes) => {
    // 添加前缀
    const prefix = filename === 'index' ? '' : `/${filename}`

    // 判断routes类型
    routes = typeof routes === 'function' ? routes(app) : routes

    // 遍历路由并添加到路由器
    Object.keys(routes).forEach(key => {
      // key => get / (method path)
      const [method, path] = key.split(' ')
      console.log(`正在映射地址 ${method.toUpperCase()} ${prefix}${path}`);
      // router.get('/index', async ctx => { })
      // router[method](`${prefix}${path}`, routes[key])

      //挂载和使用service
      router[method](`${prefix}${path}`, async ctx => {
        // 挂载上下文
        app.ctx = ctx;
        await routes[key](app)
      })
    })
  })
  return router
}

/**
 * 加载控制器配置
 */
function initController(app) {
  const controllers = {}
  load('controller', (filename, controller) => {
    controllers[filename] = controller(app)
  })
  return controllers
}

/**
 * 加载service
 */
function initService(app) {
  const services = {}
  load('service', (filename, service) => {
    services[filename] = service(app)
  })
  return services
}

/**
 * 加载数据库配置 model配置
 */
const Sequelize = require('sequelize')
function loadConfig(app) {
  load('config', (fn, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db)

      // 加载模型
      app.$model = {}
      load('model', (filename, model) => {
        const { schema, options } = model
        app.$model[filename] = app.$db.define(filename, schema, options)
      })
      // 同步数据库
      app.$db.sync()
    }

    if (conf.middleware) {
      conf.middleware.forEach(mid => {
        const midPath = path.resolve(__dirname + '/middleware', mid)
        app.$app.use(require(midPath))
      })
    }
  })
}

/**
 * 读取定时任务
 */
const schedule = require('node-schedule')

function initSchedule() {
  load('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  })
}

module.exports = {
  initRouter,
  initController,
  initService,
  initSchedule,
  loadConfig,
}