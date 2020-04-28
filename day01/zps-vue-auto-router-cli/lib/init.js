// 自定义欢迎界面
const { promisify } = require('util')
// 界面
const figlet = promisify(require('figlet'))
// clear 清屏
const clear = require('clear')
// 字体变色
const chalk = require('chalk')
// 封装log
const log = content => console.log(chalk.green(content))

// git 下载
const { clone } = require('./download.js')

const open = require('open')

module.exports = async name => {
  // 打印欢迎界面
  clear()
  const data = await figlet('KKB Welcome')
  log(data)

  //克隆git仓库
  await clone('github:su37josephxia/vue-template', name)

  // 安装依赖
  log('安装依赖')
  // cwd 进入当前创建的文件夹内 npm i
  await spawn('cnpm', ['install'], { cwd: `./${name}` })
  log(
    `
        👌
        ============
        安装依赖成功
        🚀刷起来
        ============
        👌
        `
  )

  // 打开浏览器
  await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
  open('http://localhost:8080')
}



function spawn(...args) {
  // 开启一个子进程 promise化
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    // 子进程的输入流 错误流传导到主进程中
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}