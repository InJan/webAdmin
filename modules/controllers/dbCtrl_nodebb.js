const mongodb = require("../dbConnect_Mongo_nodebb.js")
const util = require("../util.js")

const findOneByAddressInSubsciber = (address) => {
    return new Promise((resolve, reject) => {
        mongodb.users.findOne({ address: address }, (err, doc) => {
        if(err){
          reject(err);
        }
        resolve(doc);
      });
    });
};

const findAllInUsers= () => {
    return new Promise((resolve, reject) => {
        mongodb.users.find({banned : 0}, (err, doc) => {
        if(err){
          reject(err);
        }
        var obj={};
        for(d in doc)
        {
          // console.log(doc[d].toObject()['uid'])
          obj[d] = doc[d].toObject();
          var joinTime = util.timestampToTime_ms(obj[d]["joindate"])
          var lastOnline = util.timestampToTime_ms(obj[d]["lastonline"])
          // console.log(typeof(obj[d]["joindate"].toString()))
          // console.log(typeof(Number.parseInt(obj[d]["joindate"].toString()))
          obj[d]["joindate"] = joinTime;
          obj[d]["lastonline"] = lastOnline;
        }
        resolve(obj);
      });
    });
};

module.exports = {
    findAllInUsers,
    findOneByAddressInSubsciber,
};