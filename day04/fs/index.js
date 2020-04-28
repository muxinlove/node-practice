// 简单的文件系统读写数据库
const fs = require('fs')

function get(key) {
  // 异步读取
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key])
  })
}

function set(key, value) {
  // 异步读取
  fs.readFile('./db.json', (err, data) => {
    const json = data ? JSON.parse(data) : {}
    json[key] = value;
    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) {
        console.log('err', err);
      }
      console.log('写入成功');
    })
  })
}

// 命令行接口部分
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', input => {
  // set key value 
  // get key
  const [op, key, value] = input.split(' ')
  if (op === 'get') {
    get(key)
  } else if (op === 'set') {
    set(key, value)
  } else if (op === 'quit') {
    rl.close();
  }
})

rl.on('close', () => {
  console.log('程序结束');
  process.exit(0);
})