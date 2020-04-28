const conf = require('./conf.js')
const { MongoClient } = require('mongodb')
const { EventEmitter } = require('events')

class Mongodb {
  constructor(conf) {
    this.conf = conf

    this.emmiter = new EventEmitter()

    this.client = new MongoClient(conf.url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    this.client.connect(err => {
      if (err) throw err
      console.log('连接成功');
      this.emmiter.emit('connect')
    })
  }

  /**
   * collection 集合
   */
  col(colName, dbName = conf.dbName) {
    return this.client.db(dbName).collection(colName)
  }

  /**
   * 订阅连接事件
   * @param {*} event 
   * @param {*} cb 
   */
  once(event, cb) {
    this.emmiter.once(event, cb)
  }
}

module.exports = new Mongodb(conf)