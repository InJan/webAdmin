const router = require('koa-router')()
let adminModel = require('../modules/controllers/dbCtrl_admin')
//admin-add
router.post('/admin-add', async (ctx, next) =>{
    let admin = {
        adminName : ctx.request.body.adminname,
        password : ctx.request.body.pass,
        number : ctx.request.body.phone,
        email : ctx.request.body.email,
        desciption : ctx.request.body.desciption,
    }
    if(!adminModel.getOneAdmin(admin.adminName)){
        ctx.body = {
            resData: 2
        };
        console.log('has existed')
    }else{
        ctx.body = {
            resData: 1
        };
        return await adminModel.createAdmin(admin)
    }
})

router.post('/admin-edit', async (ctx, next) =>{
    let admin = {
        adminName : ctx.request.body.adminname,
        password : ctx.request.body.pass,
        number : ctx.request.body.phone,
        email : ctx.request.body.email,
        desciption : ctx.request.body.desciption,
    }
    if(!adminModel.getOneAdmin(admin.adminName)){
        ctx.body = {
            resData: 2
        };
        console.log('has existed')
    }else{
        ctx.body = {
            resData: 1
        };
        return await adminModel.alterAdmin(admin)
    }
})

module.exports = router