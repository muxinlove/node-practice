/**
 * controller 业务逻辑
 * service 通用逻辑
 * model 操作数据库
 */

const Koa = require('koa')
const {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule
} = require('./kkb-loader')

class KKB {
  constructor(conf) {
    this.$app = new Koa(conf)

    loadConfig(this)
    // 定时任务
    initSchedule()

    this.$ctrl = initController(this)
    this.$service = initService(this)
    this.$router = initRouter(this)
    this.$app.use(this.$router.routes())
  }
  start(port) {
    this.$app.listen(port, () => {
      console.log('端口成功监听: ' + port);
    })
  }
}
module.exports = KKB