const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  const { url, method } = req
  console.log('url', url, 'method', method);
  console.log('cookie', req.headers.cookie)

  if (method == "GET" && url == "/") {
    fs.readFile("./index.html", (err, data) => {
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (method == "GET" && url == "/api/users") {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // 跨域：浏览器同源策略
    // CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Set-Cookie', 'cookie1=va222;')
    res.end(JSON.stringify([{ name: "tom", age: 20 }]));
  } else if (method == "OPTIONS" && url == "/api/users") {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "X-Token,Content-Type",
      "Access-Control-Allow-Methods": "PUT"
    });
    res.end();
  } else if (method === "POST" && url === "/api/save") {
    let reqData = [];
    let size = 0;
    req.on('data', data => {
      console.log('>>>req on', data);
      reqData.push(data);
      size += data.length;
    });
    req.on('end', function () {
      console.log('end')
      const data = Buffer.concat(reqData, size);
      console.log('data:', size, data.toString())
      res.end(`formdata:${data.toString()}`)
    });
  }
})
server.listen(4000)