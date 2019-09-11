const router = require('koa-router')()
const jwt = require('jsonwebtoken')
let adminModel = require('../modules/controllers/dbCtrl_admin')
let courseModel = require('../modules/controllers/dbCtrl_course')
//admin-add
router.post('/admin-add', async (ctx, next) =>{
    let admin = {
        adminName : ctx.request.body.adminname,
        password : ctx.request.body.pass,
        number : ctx.request.body.phone,
        email : ctx.request.body.email,
        desciption : ctx.request.body.desciption,
    }
    if(await adminModel.getOneAdminByName(admin.adminName)){
        ctx.body = {
            resData: 2
        };
        // console.log('has existed')
    }else{
        ctx.body = {
            resData: 1
        };
        return await adminModel.createAdmin(admin)
    }
})
//course-add
router.post('/course-add', async (ctx, next) =>{
    let course = {
        title : ctx.request.body.title,
        pictureurl_s : ctx.request.body.pictureurl_s,
        pictureurl_m : ctx.request.body.pictureurl_m,
        availability : ctx.request.body.availability,
        introduction : ctx.request.body.introduction,
        classfication: ctx.request.body.classfication,
        detail : ctx.request.body.detail,
        tags : ctx.request.body.tags,
        features : ctx.request.body.features,     
    }
    if(await courseModel.getOneCourseByTitle(course.title)){
        ctx.body = {
            resData: 2
        };
        // console.log('has existed')
    }else{
        ctx.body = {
            resData: 1
        };
        return await courseModel.createCourse(course)
    }
})
router.post('/course-edit/:id', async (ctx, next) =>{
    let course = {
        title : ctx.request.body.title,
        pictureurl_s : ctx.request.body.pictureurl_s,
        pictureurl_m : ctx.request.body.pictureurl_m,
        availability : ctx.request.body.availability,
        introduction : ctx.request.body.introduction,
        classfication: ctx.request.body.classfication,
        detail : ctx.request.body.detail,
        tags : ctx.request.body.tags,
        features : ctx.request.body.features,     
    }
    let id = ctx.params.id
    
        ctx.body = {
            resData: 1
        };
        return await courseModel.alterCourse(id,course)
})

router.post('/admin-edit/:id', async (ctx, next) =>{
    let admin = {
        adminName : ctx.request.body.adminname,
        password : ctx.request.body.pass,
        number : ctx.request.body.phone,
        email : ctx.request.body.email,
        desciption : ctx.request.body.desciption,
    }
    let id = ctx.params.id
    ctx.body = {
        resData: 1
    };
    return await adminModel.alterAdmin(id,admin)
})

router.post('/login', async (ctx, next) =>{
    let admin = {
        adminName : ctx.request.body.adminname,
        password : ctx.request.body.password,
    }
    let userName = {
        username : ctx.request.body.adminname,
    }
    switch(await adminModel.validatePassword(admin.adminName,admin.password)){
        case 1:
            ctx.body = {
                resData: 1
            };
            break;
        case 2:
            ctx.body = {
                resData: 2
            };
            break;
        case 3:
            let secret = 'webAdmin' // 指定密钥
            let token = jwt.sign(userName, secret, { expiresIn: '1h' }) // 签发token
            ctx.session.user = admin.adminName
            ctx.status = 200
            ctx.body = {
                token: token,
                resData: 3
            };           
    }
})

module.exports = router