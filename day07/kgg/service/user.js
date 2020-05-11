// 模拟异步
const delay = (data, tick) => new Promise(resolve => {
  setTimeout(() => {
    resolve(data)
  }, tick)
})
// 可复⽤的服务 ⼀个同步，⼀个异步
module.exports = app => ({
  async getName() {
    // return delay('jerry', 1000)
    return await app.$model.user.findAll()
  },
  getAge() {
    return 20
  }
});