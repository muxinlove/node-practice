const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  // req res 都是流 stream 
  //   console.log('req', getPrototypeChain(req))
  //   console.log('res', getPrototypeChain(res))
  //   // res.end 流的操作
  //   res.end('hello http')




  const { url, method, headers } = req
  console.log(url);

  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      res.statusCode = '200'
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    res.writeHead('200', {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
      name: 'tom'
    }))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') > -1) {
    // 图片服务 流的操作
    // createReadStream
    // createWriteStream
    // pipe 管道
    fs.createReadStream('.' + url).pipe(res)
  }

})
server.listen('3000')


// 打印原型链
function getPrototypeChain(obj) {
  let chain = []
  while (obj = Object.getPrototypeOf(obj)) {
    chain.push(obj)
  }
  return chain;
}