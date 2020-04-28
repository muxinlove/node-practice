const fs = require('fs')

// // 同步读取
// const data = fs.readFileSync('./conf.js')
// // buffer
// console.log('data', data.toString());


// // 异步读取
// fs.readFile('./conf.js', (err, data) => {
//   if (err) throw err
//   console.log('data', data.toString());
// })

const { promisify } = require('util')
const readFile = promisify(fs.readFile)

// process.nexttick 只是为了用这个异步函数
process.nextTick(async () => {
  const data = await readFile('./conf.js')
  console.log('data', data.toString());
})

//promisify实现
// const promisify = fn => (...args) => new Promise((resolve, reject) => {
//   args.push((err, ...arg) => {
//     if (err) {
//       reject(err)
//     } else {
//       resolve(...arg)
//     }
//   })
//   fn.apply(null, args)
// })
