const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('./config/config');
const session = require('koa-session-minimal')
var bodyParser = require('koa-bodyparser');
var errorHandle = require('./middlewares/errorHandle')
const koaJwt = require('koa-jwt')
const axios = require('axios')
const index = require('./routes/index')
const users = require('./routes/users')
const post = require('./routes/post')

// error handler
onerror(app)

//request set header
// const TOKEN_KEY = 'login-token';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem(TOKEN_KEY);

app.use(bodyParser())
app.use(async (ctx, next) => {
    // console.log(ctx)
    let params =Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.request.header = {'authorization': "Bearer " + (params.token || '')}
    console.log(ctx)
    await next();
})

//secret and Time
const jwtSecret = 'webAdmin'
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7

const CONFIG = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
  maxAge:86400000,
}
app.use(session(CONFIG,app))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(koaJwt({secret:jwtSecret}).unless({
  path:[/^\/login/]
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(post.routes(), post.allowedMethods())

//401handler 
// app.use(errorHandle)
// app.use((ctx, next) => {
//   return next().catch((err) => {
//     if (err.status === 401) {
//       ctx.status = 401;
//       ctx.body = {
//         error: err.originalError ? err.originalError.message : err.message,
//       };
//       ctx.response.redirect('/login');
//     } else {
//       throw err;
//     }
//   });
// })


// error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

module.exports = app
