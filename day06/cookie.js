const http = require('http')

const session = {}

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return
  } else {
    const sessionKey = 'sid'
    const cookie = req.headers.cookie;

    if (cookie && cookie.indexOf(sessionKey) > -1) {
      // 已登陆
      const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
      const sid = pattern.exec(cookie)[1];
      console.log('back', sid, session, session[sid], pattern.exec(cookie))
      res.end('come back')
    } else {
      // 简单模拟
      const sid = (Math.random() * 999999999).toFixed()
      // 设置cookie
      res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
      session[sid] = { name: 'dongdong' }
      res.end('hello')
    }
  }
}).listen(3000, () => console.log('连接成功'))