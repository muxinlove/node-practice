const Koa = require('koa')
const app = new Koa()
const config = require('./config.js')
const { loadModel } = require('./framework/loader.js')

loadModel(config)(app)

const port = 3000
app.listen(port, () => console.log('app start at ' + port))