const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('a user connected');

  // 响应某用户发送信息
  socket.on('chat message', msg => {
    console.log('chat message' + msg);

    // 广播
    io.emit('chat message', msg)
    // 广播给除了发送者外所有人
    // socket.broadcast.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');

  })
})
http.listen('3000', () => {
  console.log('listen on 3000');

})