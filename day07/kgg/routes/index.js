// 重点 想要传值 将对象改为函数 柯里化传值
module.exports = app => ({
  // method path
  // 'get /': async ctx => {
  //   ctx.body = '⾸⻚'
  // },
  // 'get /detail': ctx => {
  //   ctx.body = '详情⻚⾯'
  // }

  'get /': app.$ctrl.home.index,
  'get /detail': app.$ctrl.home.detail
})