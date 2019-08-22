const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('./config/config');
const session = require('koa-session-minimal')

const index = require('./routes/index')
const users = require('./routes/users')
const post = require('./routes/post')
// error handler
onerror(app)

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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
