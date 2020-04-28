const originRequest = require('request')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')

function request(url, callback) {
  const options = {
    url,
    encoding: null
  }
  originRequest(url, options, callback)
}

for (let i = 100553; i < 100563; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`;
  request(url, function (err, res, body) {
    // 转码
    const html = iconv.decode(body, "gb2312");
    // node 中进行dom操作 继承jquery语法
    const $ = cheerio.load(html);
    console.log($(".title_all h1").text());
  });
}
