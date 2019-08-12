const sequelize = require("../dbConnect_Mysql").sequelize;

const admin = sequelize.import("../schemas/administrator");

//判断表存在与建表
// admin.sync({force: false})

class adminModel{
    static async createAdmin(data){
        var now = Date.now()
        return await admin.create({
            adminName: data.adminName,
            password: data.password,
            number: data.number,
            email: data.email,
            description: data.dercriptation,
            createdAt: now,
            updatedAt: now,
            status: '1'
        })
    }

    static async getOneAdminByID(id){
        return await admin.findOne({
            where:{
                id: id,
            }
        })
    }

    static async getAdminList(){
        return await admin.findAll()
    }

    static async outAdmin(id){
        return await f
    }

    static async rmAmdin(id){
        return await id
    }

    static async alterAdmin(id,data){
        var obj = getOneAdminByID(id)
        obj = data
        return await obj.save()
    }
}

module.exports = adminModel