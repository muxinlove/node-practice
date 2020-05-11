module.exports = {
  // /user/
  // "get /": async ctx => {
  //   ctx.body = "⽤户⾸⻚";
  // },
  // // /user/info
  // "get /info": ctx => {
  //   ctx.body = "⽤户详情⻚⾯";
  // }

  "get /": async app => {
    const name = await app.$service.user.getName()
    // app.ctx.body = '用户名字 ' + name
    app.ctx.body = name
  },
  // /user/info
  "get /info": app => {
    const age = app.$service.user.getAge()
    app.ctx.body = '用户年龄 ' + age
  }
};