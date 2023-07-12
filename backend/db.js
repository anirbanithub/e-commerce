const mongoose= require('mongoose');
const mongooseURI="mongodb://127.0.0.1:27017/inotebook";

const connectToMongo=()=>{
     mongoose.connect(mongooseURI,()=>{
        console.log("sucessfully connected to my mongoose");
    })
}

module.exports = connectToMongo;
    