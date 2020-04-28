const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
app.use(require('koa-static')(__dirname + '/'))
app.use(bodyParser())

// 初始化数据库 引用模型
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


// 定义多表关联
// userId -> Product
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})
// userId -> Product
User.hasMany(Product)

// userId -> Cart
User.hasOne(Cart)
// userId -> Cart
Cart.belongsTo(User)

// getProducts setProducts addProduct addProducts -> Cart
Cart.belongsToMany(Product, {
    through: CartItem
})

// getCarts setCarts addCart addCart -> Product
Product.belongsToMany(Cart, {
    through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
    through: OrderItem
});
Product.belongsToMany(Order, {
    through: OrderItem
});


// 同步数据库
sequelize.sync().then(
    async () => {
        // user是必须的元素
        let user = await User.findByPk(1)
        if (!user) {
            user = await User.create({
                name: 'dongdong',
                email: 'dongdong@qq.com'
            })
            // createCart hasOne方法后初始化的createXxx方法
            await user.createCart()
        }
        app.listen(3000, () => {
            console.log('listen on port 3000');
        })
    }
)

// 模拟鉴权
app.use(async (ctx, next) => {
    const user = await User.findByPk(2)
    ctx.user = user
    await next()
})

//api
const router = require('koa-router')()

// 查询商品
router.get('/admin/products', async (ctx, netxt) => {
    const products = await Product.findAll();
    ctx.body = { prods: products }
})

// 创建商品
router.post('/admin/product', async (ctx, next) => {
    const body = ctx.request.body;
    await ctx.user.createProduct(body)
    ctx.body = { success: true }
})

// 删除商品
router.delete('/admin/product/:id', async (ctx, next) => {
    const id = ctx.params.id;
    await Product.destroy({
        where: {
            id
        }
    })
    ctx.body = { success: true }
})

// 查询购物车
router.get('/cart', async (ctx, next) => {
    const cart = await ctx.user.getCart()
    const products = await cart.getProducts()
    ctx.body = { products }
})

// 添加购物车
router.post('/cart', async (ctx, next) => {
    const body = ctx.request.body;
    const prodId = body.id
    let newQut = 1
    const cart = await ctx.user.getCart()

    const products = await cart.getProducts({
        where: { id: prodId }
    })

    let product
    if (products.length) {
        product = products[0]
    }
    if (product) {
        let oldQut = product.cartItem.quantity
        newQut = oldQut + 1
    } else {
        product = await Product.findByPk(prodId)
    }

    await cart.addProduct(product, {
        through: {
            quantity: newQut
        }
    })
    ctx.body = { success: true }
})


//删除购物车
router.delete('/cartItem/:id', async ctx => {
    const id = ctx.params.id
    const cart = await ctx.user.getCart()
    const products = await cart.getProducts({
        where: { id }
    })
    let product = products[0]
    await product.cartItem.destroy()
    ctx.body = { success: true }
})

// 查询订单
router.get('/orders', async ctx => {
    const orders = await ctx.user.getOrders({
        include: ['products'],
        order: [['id', 'DESC']]
    })
    ctx.body = { orders }
})

// 下单 
router.post('/orders', async ctx => {
    const cart = await ctx.user.getCart()
    const products = await cart.getProducts()
    const order = await ctx.user.createOrder()
    await order.addProduct(
        products.map(p => {
            p.orderItem = {
                quantity: p.cartItem.quantity
            }
            return p
        })
    )
    await cart.setProducts(null)
    ctx.body = { success: true }
})



app.use(router.routes())