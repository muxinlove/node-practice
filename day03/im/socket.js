// tcp 协议
const net = require('net')
// 创建服务器
const chatServer = net.createServer()
// 存储当前连接的客户端列表
const clientList = []
// 监听连接事件
chatServer.on('connection', client => {
  // 客户端打印
  client.write('hi!\n')
  clientList.push(client)

  //监听客户端数据传输（buffer）
  client.on('data', data => {
    console.log('receive', data.toString())
    // 各客户端打印
    clientList.forEach(v => {
      if (client !== v) {
        v.write(data)
      }
    })
  })
})

chatServer.listen(9000)