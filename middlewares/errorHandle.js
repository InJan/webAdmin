// middlewares/errorHandle.js
errorHandle = (ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
        };
        ctx.response.redirect('/login');
      } else {
        throw err;
      }
    });
  }
module.exports=function(){
    errorHandle
}