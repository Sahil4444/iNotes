const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectMongo =async()=>{
    if(!mongoose.connect(mongoURI)){
        console.log("Something Error Occured!");
    }
    console.log("YES");
    mongoose.connect(mongoURI);

}

module.exports = connectMongo;