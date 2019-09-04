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

// app.use(koaJwt({secret:jwtSecret}).unless({
//   path:[/^\/login/]
// }))

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

//request set header
// const TOKEN_KEY = 'login-token';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem(TOKEN_KEY);
let localFilter = (ctx) =>{
  let url = ctx.originalUrl
  if(allowpage.indexOf(url)>-1){
    logger.info('kezhijiefangwen')
  }else{
    if(ctx.isAuthenticated()){
      if(url==='/'){
        ctx.redirect('/index')
      }
      console.log('success')      
    }else{
      console.log('fail')
      console.log(ctx.request.url)
      ctx.redirect('/login')
    }
  }
}



app.use(bodyParser())
app.use(async (ctx, next) => {
    // console.log(ctx)
    // console.log(ctx.request.header)
    // let params = 1
    // let params = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY3NDc3MTI5LCJleHAiOjE1Njc0ODA3Mjl9.doZpXY6GxJxfi7T34DYGpHOxyVM2LdQCRDj2UOtREUA"
    // let params =Object.assign({}, ctx.request.query, ctx.request.body).token || '';
    // ctx.request.header = {'authorization': "Bearer " + (params)}
    // console.log(params)
    // console.log(ctx.session.user)
    // if(!ctx.session.user){
    //   ctx.redirect('/login');
    // }else{
    //   ctx.response.redirect('/index');
    // }
    // localFilter(ctx)
    await next();
})
// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(),index.allowedMethods())
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
