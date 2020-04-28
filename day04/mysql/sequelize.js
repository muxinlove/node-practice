(async () => {
  // sequelize 数据库中间件 支持多种数据库 事务 关联等
  const Sequelize = require('sequelize')
  const sequelize = new Sequelize('kaikeba', 'root', 'Zps1044956645', {
    host: 'localhost',
    dialect: 'mysql'// 指定数据库
  })

  // 定义模型
  /**
   * 1.id 默认自增 可设置为uuid作为主键
   * 2.timestamps 避免⾃自动⽣生成时间戳字段
   * 3.指定表名 默认为modleName的复数
   *  freezeTableName: true 则define的modleName为表名（Fruit）
   *  tableName:'xxx' 则指定为表名
   */
  const Fruit = sequelize.define('Fruit', {
    // id: {
    //   type: Sequelize.DataTypes.UUID,
    //   defaultValue: Sequelize.DataTypes.UUIDV1,
    //   primaryKey: true
    // },
    name: {
      type: Sequelize.STRING(20), allowNull: false
    },
    price: {
      type: Sequelize.FLOAT, allowNull: false,
      validate: {
        isFloat: { msg: '价格字段输入为数字' }
      }
    },
    stock: {
      type: Sequelize.INTEGER, defaultValue: 0
    }
  }, {
    // timestamps: false,
    // tableName: 'frultsss'
  })

  // 创建表 初始化表结构
  // let ret = await Fruit.sync()
  // 强制同步
  let ret = await Fruit.sync({ force: true })

  // 新增数据
  await Fruit.create({
    name: '西瓜',
    price: 9.9
  })
  await Fruit.create({
    name: '苹果',
    price: 3.2
  })
  await Fruit.create({
    name: '苹果',
    price: 5.2
  })

  // 修改数据
  // await Fruit.update({
  //   price: 4
  // }, {
  //   where: { name: '苹果' }
  // })

  // let xigua = await Fruit.findOne({ wherr: { name: '西瓜' } })
  // xigua.price = 12.9
  // await xigua.save()

  // 删除
  // let xigua = await Fruit.findOne({ where: { name: '西瓜' } })
  // await xigua.destroy()

  // await Fruit.destroy({ where: { name: '西瓜' } })


  // 操作符
  const Op = Sequelize.Op;
  // ret = await Fruit.findAll({
  //   where: {
  //     price: { [Op.lt]: 5, [Op.gt]: 2 }
  //   }
  // })

  // ret = await Fruit.findOne({
  //   where: { name: '苹果' }
  // })
  // ret = await Fruit.findAll({
  //   where: { name: '苹果' }
  // })

  // ret = await Fruit.findAll({
  //   attributes: ['name']
  // })
  // ret = await Fruit.findAndCountAll()

  // 分页
  // ret = await Fruit.findAll({
  //   offset: 0,
  //   limit: 3
  // })

  // 排序
  // ret = await Fruit.findAll({
  //   order: [['price']]
  // })

  // 聚合
  // ret = await Fruit.max('price')
  // ret = await Fruit.sum('price')


  // console.log('findAll', JSON.stringify(ret));


})()