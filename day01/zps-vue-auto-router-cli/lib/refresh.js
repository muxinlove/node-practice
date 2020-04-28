const fs = require('fs');
// 模版引擎
const handlebars = require('handlebars');
const chalk = require('chalk');

module.exports = async () => {

  // 读取文件
  const list = fs.readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').toLowerCase(),
      file: v
    }))

  // refresh
  compile({ list }, './src/router.js', './template/router.js.hbs')
  compile({ list }, './src/App.vue', './template/App.vue.hbs')

  /**
   * 编译模版文件
   * @param {*} meta 数据定义
   * @param {*} filePath 目标文件路径
   * @param {*} templatePath 模版文件路径
   */
  function compile(meta, filePath, templatePath) {
    //判断模版文件是否存在
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      // 编译
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(filePath, result)
      console.log(chalk.green(`🚀 ${filePath}创建成功`))
    }
  }
}