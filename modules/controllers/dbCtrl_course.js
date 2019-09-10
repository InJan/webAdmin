const sequelize = require("../dbConnect_Mysql").sequelize;

const course = sequelize.import("../schemas/course");

//判断表存在与建表
// course.sync({force: false})

class courseModel{
    static async createCourse(data){
        var now = Date.now()
        return await course.create({
            title: data.title,
            pictureurl_s: data.pictureurl_s,
            pictureurl_m: data.pictureurl_m,
            availability: data.availability,
            introduction: data.introduction,
            classfication: data.classfication,
            detail: data.detail,
            tags:data.tags,
            features: data.features,
            createdAt: now,
            updatedAt: now,
            status:1,
        })
    }

    static async getOneCourseByID(id){
        return await course.findOne({
            where:{
                id: id,
            }
        })
    }
    static async getOneCourseByTitle(title){
        return await course.findOne({
            where:{
                courseTitile: title,
            }
        })
    }

    static async getCourseList(){
        return await course.findAll()
    }

    static async outCourse(id){
        return await f
    }

    static async rmCourse(id){
        return await id
    }

    static async alterCourse(id,data){
        
        return await course.update(data,{
            where:{
                id: id
            }
        })
    }
    
    static async validatePassword(courseName,password){
        let courseObj = await course.findOne({
            where:{
                courseName: courseName,
            }
        })
        if(courseObj){
            if(password == courseObj.password){
                return 3
            }else{
                return 2;
            }
        }else{
            return 1;
        }
    }
}

module.exports = courseModel