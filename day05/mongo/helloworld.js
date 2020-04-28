(async () => {
  const { MongoClient } = require('mongodb')
  // 创建客户端
  const client = new MongoClient(
    'mongodb://localhost:27017',
    {
      // 新的url字符串解析
      userNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  let ret
  // 创建连接
  ret = await client.connect()
  const db = client.db('test')
  const fruits = db.collection('fruits')

  // 添加文档
  ret = await fruits.insertOne({
    name: '芒果',
    price: 20.1
  })
  console.log('插⼊成功', JSON.stringify(ret))
  // 修改
  // 更新的操作符$set
  ret = await fruits.updateOne({ name: '芒果' }, { $set: { name: '苹果' } })
  console.log('更新成功', JSON.stringify(ret.result))
  // 查
  ret = await fruits.findOne()
  console.log('查询', JSON.stringify(ret))
  // 删除
  ret = await fruits.deleteOne({ name: '苹果' })

  await fruits.deleteMany()
  client.close()
})()