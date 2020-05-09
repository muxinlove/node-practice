'use strict';

const { Service } = require('egg');

class UserService extends Service {
  async getAll() {
    // return [
    //   {
    //     name: 'user service page',
    //   },
    // ];
    return this.ctx.model.User.findAll();
  }
}

module.exports = UserService;
