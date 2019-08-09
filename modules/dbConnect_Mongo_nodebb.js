let mongoose = require('mongoose')

var url = "mongodb://localhost:27017/nodebb";
var db = mongoose.createConnection(url,{ useNewUrlParser: true },(err,res)=>{
    if(err){
        console.log(err)
	}
	else{
        console.log("DB Mongo/nodebb success")
    }
})

let usersSchema = new mongoose.Schema({
    username: 0,
	userslug: 0,
	email: 0,
	joindate: 0,
	lastonline: 0,
	picture: 0,
	fullname: 0,
	location: 0,
	birthday: 0,
	website: '',
	signature: '',
	uploadedpicture: '',
	profileviews: 0,
	reputation: 0,
	postcount: 0,
	topiccount: 0,
	lastposttime: 0,
	banned: 0,
	status: 0,
	gdpr_consent: 0,
	acceptTos: 0,
})

let mongoDB ={
    users: db.model('objects',usersSchema)
}

module.exports = mongoDB