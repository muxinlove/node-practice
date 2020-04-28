const { promisify } = require('util')
// git下载的库
const download = promisify(require('download-git-repo'))
// 进度条
const ora = require('ora')

/**
 * repo git地址
 * desc 下载保存的地址
 */
module.exports.clone = async (repo, desc) => {
  const process = ora(`下载.....${repo}`)
  // 开始进度条
  process.start()
  await download(repo, desc)
  // 等待下载成功 进度条成功
  process.succeed()
}
