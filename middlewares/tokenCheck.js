//编写token验证中间件
const jwt = require('jsonwebtoken');
const util = require('util');
import userModels from '../models/usertest.js'
const verify = util.promisify(jwt.verify);
/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        // 获取jwt
        const token = ctx.header.authorization;
        if (!!token) {
            try {
                // 解密payload，获取用户名和ID
                let payload = await verify(token.split(' ')[1], 'lxPhone');
                let user = await userModels.getUserByName(payload.username)
                if (!!user) {
                    ctx.user = {
                        username: payload.account,
                        id: payload.id,
                        role: payload.role
                    }
                } else {
                    console.log('解析出来的域账号不在数据库中')
                }
            } catch (err) {
                ctx.body = {
                    success: 0,
                    message: '认证失败',
                    returnCode: '000005'
                };
            }
        }
        await next();
    }
}