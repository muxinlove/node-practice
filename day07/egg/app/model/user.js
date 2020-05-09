'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const User = app.model.define(
    'user',
    { name: STRING(30) },
    { timestamps: false }
  );
  // 数据库同步
  // 测试用 实际生产应用下 不可以这样写
  User.sync({ force: true });
  return User;
};
