module.exports = app => ({
  index: async ctx => {
    // app.ctx.body = "⾸⻚ ctrl";
    // const name = await app.$service.user.getName()
    // app.ctx.body = '⾸⻚ ctrl 用户名字 ' + name

    app.ctx.body = await app.$model.user.findAll()
  },
  detail: ctx => {
    // app.ctx.body = "详情⻚⾯ ctrl";
    const age = app.$service.user.getAge()
    app.ctx.body = '详情⻚⾯ ctrl 用户年龄 ' + age
  }
})