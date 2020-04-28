// 加载model下文件
// loderModel

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const config = require('../config')

function load(dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir)
  const files = fs.readdirSync(url)
  files.forEach(filename => {
    // 去掉后缀
    filename = filename.replace('.js', '')
    // 导入文件
    const file = require(url + '/' + filename)
    // 处理
    cb(filename, file)
  })
}

const loadModel = config => app => {
  mongoose.connect(config.db.url, config.db.options)
  const conn = mongoose.connection
  conn.on('error', () => console.error('连接数据库异常'))
  app.$model = {}
  load('../model', (filename, { schema }) => {
    console.log('load model', filename, schema);
    app.$model[filename] = mongoose.model(filename, schema)
  })
}

module.exports = {
  loadModel
}