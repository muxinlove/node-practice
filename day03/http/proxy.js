const express = require('express')

// http-proxy-middleware 跟老师课上用法不一致 可能是版本不一致问题

// const proxy = require('http-proxy-middleware')
// app.use('/api', proxy({
//   // ...
// }))

const proxyMiddleware = require('http-proxy-middleware')
const proxy = proxyMiddleware.createProxyMiddleware({
  target: 'http://localhost:4000'
})

const app = express()
app.use(express.static(__dirname + '/'))
// 反向代理
app.use('/api', proxy)
app.listen(3000)