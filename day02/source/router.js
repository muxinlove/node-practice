class Router {
  constructor() {
    // 路由存储
    this.stack = []
  }
  // 注册路由
  register(path, methods, middleware) {
    let route = { path, methods, middleware }
    this.stack.push(route)
  }
  // 模拟 get post 请求
  get(path, middleware) {
    this.register(path, 'get', middleware)
  }
  post(path, middleware) {
    this.register(path, 'get', middleware)
  }
  routes() {
    let stack = this.stack
    return async (ctx, next) => {
      let { url, method } = ctx
      const currentRoute = stack.find(item => {
        return item.path === url && item.methods.indexOf(method) > -1;
      })
      const route = currentRoute && currentRoute.middleware
      if (typeof route === 'function') {
        route(ctx, next);
        return;
      }
      await next();
    }
  }
  routers() {
    return async (ctx, next) => {
      const { url } = ctx;
      console.log('url', url);
      await next()
    }
  }
}

module.exports = Router;