const router = require('koa-router')();
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const dataCtrl = require('../../lib/user.js')
const mongoDBSuber = require('../../lib/mongodb.js')
const moment = require('moment');

const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../../mail/mail_template.ejs'), 'utf8'));
const subscribeTemp = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../../mail/subscribe_template.ejs'), 'utf8'));

let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
        user: '514173569@qq.com',
        pass: 'uxzctynczguccbba',
    }
}) 
router.post('/showSubscribers',async(ctx,next) =>{
    let doc = await dataCtrl.findAllData();
    ctx.body = doc;
})

router.post('/subscribe-student',async(ctx,next) =>{
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    let user = new mongoDBSuber.student({
        address: ctx.request.body.subscribe,
        timestamp: time
    });
    
    let doc = await dataCtrl.findDataByStuName(user.address);
    if(doc){
        ctx.body = {
            msg: "Subscriber already exists!"
          };
    }else{ 
        await new Promise((resolve, reject) => {
            user.save((err,result) => {
              if(err){
                reject(err);
              }  
              console.log('New users：'+result.address+'subscribe student column success')
              resolve(result);
            });
          });
          ctx.body = {
            msg: "Subscribe Success"
        };
        }
})
router.post('/subscribe-developer',async(ctx,next) =>{
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    let user = new mongoDBSuber.developer({
        address: ctx.request.body.subscribe,
        timestamp: time
    });
    
    let doc = await dataCtrl.findDataByDevName(user.address);
    if(doc){
        ctx.body = {
            msg: "Subscriber already exists!"
          };
    }else{ 
        await new Promise((resolve, reject) => {
            user.save((err,result) => {
              if(err){
                reject(err);
              }  
              console.log('New users：'+result.address+'subscribe developer column success')
              resolve(result);
            });
          });
          ctx.body = {
            msg: "Subscribe Success"
        };
        }
})

router.post('/subscribe',async(ctx,next) =>{
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    let user = new mongoDBSuber.announce({
        address: ctx.request.body.subscribe,
        timestamp: time
    });
    
    let doc = await dataCtrl.findDataByName(user.address);
    if(doc){
        ctx.body = {
            msg: "Subscriber already exists!"
          };
    }else{ 
        await new Promise((resolve, reject) => {
            user.save((err,result) => {
              if(err){
                reject(err);
              }  
              console.log('New users：'+result.address+'subscribe success')
              resolve(result);
            });
          });
                // const html = subscribeTemp(ctx.request.body)
                // let mailOptions = {
                //     from: '"LongerVisionNoticer"<514173569@qq.com>', // sender address
                //     to: "514173569@qq.com,postmaster@longervisionrobot.com",
                //     subject: 'New user subscription notifications', 
                //     html: html,
                // };
                // transporter.sendMail(mailOptions, (error, info) => {
                //     if (error) {
                //         ctx.body = {
                //             msg: "Subscribe Failure"
                //           };
                //       return console.log(error);
                //     }
                //     console.log('Message sent: %s', info.messageId);
                // });
                // await transporter;
                ctx.body = {
                    msg: "Subscribe Success"
                };
        }
})
router.post('/sendEmail',async(ctx,next) =>{
    // const html = template({
    //     Name : ctx.reuqest.body.name,
    //     mailAddress: ctx.request.body.mailAddress,
    // }); 
    const html = template(ctx.request.body)
    let mailOptions = {
        from: '"'+ctx.request.body.userName+'"<514173569@qq.com>', // sender address
        to: ctx.request.body.DESTAddress, // list of receivers // 收件人列表，以逗号隔开
        subject: 'Get Mail From longervisionrobot.com', 
        html: html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            ctx.body = {
                msg: "Send Failure"
              };
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
    // await transporter;
    ctx.body = {
        msg: "Send Success"
      };
})

// router.get('/send',async(ctx,next) =>{
//     const transporter = require('../middlewares/sendemail.js').transporter;
//     await transporter;
//     ctx.body = 'send success!';
// })
module.exports = router