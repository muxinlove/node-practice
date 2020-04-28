(async () => {
  const mysql = require('mysql2/promise')
  // 连接配置
  const cfg = {
    host: "localhost",
    user: "root",
    password: "Zps1044956645", // 修改为你的密码
    database: "kaikeba" // 请确保数据库存在
  };
  // 创建连接对象
  const connection = await mysql.createConnection(cfg);


  // sql 语句
  // 创建表
  const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
                    id INT NOT NULL AUTO_INCREMENT,
                    message VARCHAR(45) NULL,
                    PRIMARY KEY (id))`
  // 插入数据
  const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`

  // 查询语句
  const SELECT_SQL = `SELECT * FROM test`;


  let create = await connection.execute(CREATE_SQL)
  console.log('create', create);

  let insert = await connection.execute(INSERT_SQL, ['abc'])
  console.log('insert', insert);

  let [rows, fields] = await connection.execute(SELECT_SQL)
  console.log('select', JSON.stringify(rows));

})()