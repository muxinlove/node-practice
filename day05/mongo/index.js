const express = require('express')
const path = require('path')
const mongodb = require('./models/db.js')

const app = express()

// 返回页面
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

// 获取列表数据
app.get('/api/list', async (req, res) => {
  // 分页查询
  const { page, category, keyword } = req.query;

  // 查询条件
  const condition = {}
  if (category) {
    condition.category = category
  }
  if (keyword) {
    // 正则 $regex
    condition.name = { $regex: new RegExp(keyword) }
  }

  const col = mongodb.col('fruits');
  const total = await col.find(condition).count();

  // skip limit 返回的是cursor游标，需要toArray()转为数组返回
  const fruits = await col.find(condition)
    .skip((page - 1) * 5)
    .limit(5)
    .toArray();
  res.json({
    ok: 1,
    data: {
      fruits,
      pagination: { total, page }
    }
  })
})

// 种类查询
app.get('/api/category', async (req, res) => {
  const col = mongodb.col('fruits')
  const data = await col.distinct('category')
  res.json({ ok: 1, data })
})

app.listen(3000, () => {
  console.log('端口3000 连接成功');
})
