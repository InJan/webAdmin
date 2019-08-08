const router = require('koa-router')()
let dbCtrl_lv = require('../models/dbCtrl_lv')
let dbCtrl_nodebb = require('../models/dbCtrl_nodebb')
//index
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Welcome to the webAdmin!'
  })
})
router.get('/index', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Welcome to the webAdmin!'
  })
})
router.get('/welcome', async (ctx, next) => {
  await ctx.render('welcome', {
    // title: 'Welcome to the webAdmin!'
  })
})
router.get('/welcome1', async (ctx, next) => {
  await ctx.render('welcome1', {
  })
})
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
  })
})

//member
router.get('/member-list', async (ctx, next) => {
  let docs = await dbCtrl_nodebb.findAllInUsers()
  await ctx.render('member-list', {   
    data: docs
  })
})
router.get('/member-del', async (ctx, next) => {
  await ctx.render('member-del', {
  })
})
router.get('/member-list1', async (ctx, next) => {
  await ctx.render('member-list1', {
  })
})
router.get('/member-edit', async (ctx, next) => {
  await ctx.render('member-edit', {
  })
})
router.get('/member-add', async (ctx, next) => {
  await ctx.render('member-add', {
  })
})
router.get('/member-password', async (ctx, next) => {
  await ctx.render('member-password', {
  })
})

//subscriber-list
router.get('/subscriber-list', async (ctx, next) => {
  let docs = await dbCtrl_lv.findAllInSubscriber();
  await ctx.render('subscriber-list', {
    data: docs
  })
})

//order
router.get('/order-list', async (ctx, next) => {
  await ctx.render('order-list', {
  })
})
router.get('/order-list1', async (ctx, next) => {
  await ctx.render('order-list1', {
  })
})
router.get('/order-add', async (ctx, next) => {
  await ctx.render('order-add', {
  })
})
router.get('/cate', async (ctx, next) => {
  await ctx.render('cate', {
  })
})
router.get('/city', async (ctx, next) => {
  await ctx.render('city', {
  })
})

//admin
router.get('/admin-list', async (ctx, next) => {
  await ctx.render('admin-list', {
  })
})
router.get('/admin-role', async (ctx, next) => {
  await ctx.render('admin-role', {
  })
})
router.get('/admin-add', async (ctx, next) => {
  await ctx.render('admin-add', {
  })
})
router.get('/admin-edit', async (ctx, next) => {
  await ctx.render('admin-edit', {
  })
})
router.get('/role-add', async (ctx, next) => {
  await ctx.render('role-add', {
  })
})
router.get('/admin-cate', async (ctx, next) => {
  await ctx.render('admin-cate', {
  })
})
router.get('/admin-rule', async (ctx, next) => {
  await ctx.render('admin-rule', {
  })
})

//echarts
router.get('/echarts1', async (ctx, next) => {
  await ctx.render('echarts1', {
  })
})
router.get('/echarts2', async (ctx, next) => {
  await ctx.render('echarts2', {
  })
})
router.get('/echarts3', async (ctx, next) => {
  await ctx.render('echarts3', {
  })
})
router.get('/echarts4', async (ctx, next) => {
  await ctx.render('echarts4', {
  })
})
router.get('/echarts5', async (ctx, next) => {
  await ctx.render('echarts5', {
  })
})

router.get('/echarts6', async (ctx, next) => {
  await ctx.render('echarts6', {
  })
})

router.get('/echarts7', async (ctx, next) => {
  await ctx.render('echarts7', {
  })
})

router.get('/echarts8', async (ctx, next) => {
  await ctx.render('echarts8', {
  })
})


router.get('/unicode', async (ctx, next) => {
  await ctx.render('unicode', {
  })
})
router.get('/error', async (ctx, next) => {
  await ctx.render('error', {
  })
})
router.get('/denmo', async (ctx, next) => {
  await ctx.render('demo', {
  })
})
router.get('/log', async (ctx, next) => {
  await ctx.render('log', {
  })
})




// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
