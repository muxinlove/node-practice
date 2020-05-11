// const Koa = require('koa')
// const { initRouter } = require('./kkb-loader')

// const app = new Koa()
// app.use(initRouter().routes())
// app.listen(3000, () => console.log('连接成功'))


const KKB = require('./kkb')
const app = new KKB()
app.start(3000)