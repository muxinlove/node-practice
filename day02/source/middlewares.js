// const add = (x, y) => x + y
// const square = (x) => x * x

// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args)
//   other.forEach(fn => {
//     ret = fn(ret)
//   })
//   return ret
// }

// const count = compose(add, square)(1, 2)
// console.log('count', count);

async function f1(next) {
  console.log('f1');
  await next()
  console.log('f1 end');
}

async function f2(next) {
  console.log('f2');
  await delay()
  await next()
  console.log('f2 end');
}
async function f3(next) {
  console.log('f3');
}


function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000);
  })
}

function compose(middlewares) {
  return () => {
    // 执行第一个中间件函数
    return dispatch(0)

    function dispatch(i) {
      const fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(() => {
          // 执行下一个中间件函数
          return dispatch(i + 1)
        })
      )
    }
  }
}

const middlewares = [f1, f2, f3]

const finFn = compose(middlewares)
finFn();

