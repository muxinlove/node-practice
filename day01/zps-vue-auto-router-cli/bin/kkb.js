#!/usr/bin/env node

// 上面声明解析器
// commander 定制命令行界面
const program = require('commander')
// version -V
program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init.js'))

program
  .command('refresh')
  .description('refresh project')
  .action(require('../lib/refresh.js'))

// 必须写
program.parse(process.argv)