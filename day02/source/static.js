const fs = require('fs')
const path = require('path')

function static(dirPath = './public') {
  return async (ctx, next) => {
    // 静态资源 
    if (ctx.url.indexOf('/public') === 0) {
      // 获取文件路径
      const url = path.resolve(__dirname, dirPath);
      // const fileBaseName = path.basename(url)
      const filePath = url + ctx.url.replace('/public', '')
      console.log('filepath', filePath);

      // console.log('path', ctx.url, dirPath, url, fileBaseName, filePath);

      // 读取文件
      try {
        stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
          // 文件夹
          const dir = fs.readdirSync(filePath)
          // return 
          let ret = ['<div style="padding-left:20px;">']
          dir.forEach(filename => {
            // 简单认为带.就是文件 严格来说 是需要statSync
            if (filename.indexOf('.') > -1) {
              // 文件
              ret.push(`<p><a style="color:black;" href='${ctx.url + '/' + filename}'>${filename}</a></p>`)
            } else {
              // 文件夹
              ret.push(`<p><a href='${ctx.url + '/' + filename}'>${filename}</a></p>`)
            }
          })
          ret.push('</div>')
          ctx.body = ret.join('')
        } else {
          // 文件
          const content = fs.readFileSync(filePath)
          ctx.body = content
        }
      } catch (e) {
        console.log('e', e);

        ctx.body = '404 not found'
      }
    } else {
      // 非静态资源 则转到下一个中间件
      await next()
    }
  }
}

module.exports = static