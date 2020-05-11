module.exports = {
  db: {
    dialect: 'mysql', // 使用的是什么数据库 mysql
    host: 'localhost',
    database: 'kaikeba',
    username: 'root',
    password: 'Zps1044956645'
  },
  // 保证顺序
  middleware: ['logger']
}