const mongodb = require("../dbConnect_Mongo_lv.js")

const findOneByAddressInSubsrciber = (address) => {
    return new Promise((resolve, reject) => {
      mongodb.subscriber.findOne({ address: address }, (err, doc) => {
        if(err){
          reject(err);
        }
        resolve(doc);
      });
    });
};

const findAllInSubscriber = () => {
    return new Promise((resolve, reject) => {
      mongodb.subscriber.find({}, (err, doc) => {
        if(err){
          reject(err);
        }
        resolve(doc);
      });
    });
};

module.exports = {
    findAllInSubscriber,
    findOneByAddressInSubscriber,
};