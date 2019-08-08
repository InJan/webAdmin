let mongoose = require('mongoose')

var url = "mongodb://localhost:27017/longervisioncn";
var db = mongoose.createConnection(url,{ useNewUrlParser: true },(err,res)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("DB success in LV")
    }
})
//主页内容
let indexContentSchema = new mongoose.Schema({
    navlist: {
        type: Array,
        default: []
    },
    enNavList: {
        type: Array,
        default: []
    }
})

//英文导航栏
let indexEnNavSchema = new mongoose.Schema({
    enNavList: {
        type: Array,
        default: []
    }
})

//ContactUs
let contactUsSchema = new mongoose.Schema({
    LinkMethodCn: {
        type: Object,
        default: {}
    },
    LinkMethodEn: {
        type: Object,
        default: {}
    }
})

//hardwareProducts
let hardwareProductsSchema = new mongoose.Schema({
    name: String,
    en_name: String,
    nextCategory: Array
})

//softwareProducts
let softwareProductsSchema = new mongoose.Schema({
    name: String,
    en_name: String,
    nextCategory: Array
})

//subscriberUsers
let subscriberSchema = new mongoose.Schema({
    address: String,
    timestamp: Date
})

MongoDB = {
    indexContent: mongoose.model('index',indexContentSchema,'index'),
    indexEnNav: mongoose.model('enIndex',indexEnNavSchema,'enIndex'),
    hardwareProducts: mongoose.model('hardwareProducts',hardwareProductsSchema,'hardwareProducts'),
    softwareProducts: mongoose.model('softwareProducts',softwareProductsSchema,'softwareProducts'),
    contactUs: mongoose.model('contactUs',contactUsSchema,'contactUs'),
    subscriber: db.model('subscribers',subscriberSchema),
}
module.exports = MongoDB