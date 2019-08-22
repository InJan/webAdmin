//koa端
//登录成功后签发token

let adminModel = require('../modules/controllers/dbCtrl_admin')
// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')
const nameToToken = async function (ctx) {
    const data = ctx.request.body
    try {
        const userInfo = await adminModel.getOneAdminByName(data.adminname)
        if (userInfo != null) {
            let userToken = {
                username: userInfo.adminName,
                // id: userInfo.id,
                // role: userInfo.role
            }
            let secret = 'webAdmin' // 指定密钥
            let token = jwt.sign(userToken, secret, { expiresIn: '1h' }) // 签发token
            ctx.body = {
                result: {
                    token: token,
                    name: userInfo.adminName,
                    // role: userInfo.role
                },
                returnCode: "000000",
                returnMsg: "token获取成功"
            }
        } else {
            ctx.body = {
                returnCode: "000002",
                returnMsg: "用户名不存在"
            }
        }
    }
    catch (err) {
        ctx.body = {
            returnCode: "000001",
            returnMsg: "服务端错误"
        }
    }
}
module.exports = {
    nameToToken,
};