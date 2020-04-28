const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const conn = mongoose.connection
conn.on('error', () => console.error('连接失败'))
conn.once('open', async () => {
  // 定义Schema
  const Schema = mongoose.Schema({
    category: String,
    name: String
  })
  // 定义Model
  const Model = mongoose.model('fruit', Schema)

  let r = await Model.create({
    category: '热带水果',
    name: '苹果',
    price: 5
  })
  console.log('插入数据', r);

  r = await Model.find({ name: "苹果" });
  console.log("查询结果:", r);

  r = await Model.updateOne({ name: "苹果" }, { $set: { name: '芒果' } });
  console.log("更新结果:", r);
  // 7.删除，deleteOne返回Query 
  r = await Model.deleteOne({ name: "苹果" });
  console.log("删除结果:", r);
})