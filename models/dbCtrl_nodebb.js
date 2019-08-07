const mongodb = require("./dbConnect_Mongo_nodebb.js")

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
        mongodb.users.find({$where : "this.username == 'xiaoming'"}, (err, doc) => {
        if(err){
          reject(err);
        }
        console.log(doc)
        resolve(doc);
      });
    });
};

module.exports = {
    findAllInUsers,
    findOneByAddressInSubsciber,
};