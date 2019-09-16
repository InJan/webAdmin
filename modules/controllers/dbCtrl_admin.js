const sequelize = require("../dbConnect_Mysql").sequelize;

const admin = sequelize.import("../schemas/administrator");

//判断表存在与建表
// admin.sync({force: false})

class adminModel{
    static async createAdmin(data){
        var now = Date.now()
        return await admin.create({
            courseName: data.courseName,
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
    static async getOneAdminByName(name){
        return await admin.findOne({
            where:{
                adminName: name,
            }
        })
    }

    static async getAdminList(){
        return await admin.findAll()
    }

    static async outAdmin(id){
        return await f
    }

    static async rmAdmin(id){
        return await id
    }

    static async alterAdmin(id,data){
        
        return await admin.update(data,{
            where:{
                id: id
            }
        })
    }
    
    static async validatePassword(adminName,password){
        let adminObj = await admin.findOne({
            where:{
                adminName: adminName,
            }
        })
        if(adminObj){
            if(password == adminObj.password){
                return 3
            }else{
                return 2;
            }
        }else{
            return 1;
        }
    }
}

module.exports = adminModel